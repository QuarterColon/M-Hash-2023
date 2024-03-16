import threading
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
from elevenlabs import generate, play, set_api_key
import language_tool_python

running_thread = None

set_api_key("cff43c28a4825f1d7c3d3b530e7f97e7")
openai.api_key = "OPENAI_key"
grammar_tool = language_tool_python.LanguageTool('en-US')

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

messages = [
    {"role": "system",
     "content": "You are a helpful and kind AI tutor for middle school students. You explain things in a way children of ages 10-14 can understand. Make sure to answer in less than 100 words."}
]


def play_audio(audio):
    play(audio)


def chat_with_gpt(input):
    global messages

    messages.append({"role": "user", "content": input})
    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.9,
        max_tokens=200,
        top_p=0.1,
        frequency_penalty=0.2,
        presence_penalty=0.0,
        messages=messages
    )
    reply = chat.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    return reply


def evaluate_story(input):
    if input:
        # Check grammar and spelling using LanguageTool
        text = input
        grammar_errors = grammar_tool.check(text)
        num_errors = len(grammar_errors)

        # Calculate the grammar and spell check score
        max_score = 10
        grammar_score = max(max_score - num_errors, 0)

        response = grammar_score/max_score
        return response


app = FastAPI(title='MHash Deployment')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/aitutor")
def ai_tutor(prompt: dict):
    global running_thread

    reply = chat_with_gpt(prompt['text'])

    audio = generate(
        text=reply,
        voice="Serena"
    )

    if running_thread is not None and running_thread.is_alive():
        running_thread.join()

    running_thread = threading.Thread(target=play_audio, args=(audio,))
    running_thread.start()

    return {"data": reply}


@app.post("/grammar")
def grammar_test(essay: dict):
    print(essay)
    result = evaluate_story(essay['text'])

    message = [
        {"role": "system",
         "content": "You are a helpful and kind AI tutor for children with dyslexia. You will be provided with the input text and the grammar score. Provide them with words of motivation. They have to use each of the following words: magnificent, castle, shepherd, princess, beautiful. If even one word is missed, you must respond accordingly. If their grammar score is below 7.5, then explain to them how they can increase their score."},
        {"role": "user",
         "content": f"Input text: \"{essay['text']}\"\nOutput score: {result}"}
    ]

    chat = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.9,
        max_tokens=500,
        top_p=0.1,
        frequency_penalty=0.2,
        presence_penalty=0.0,
        messages=message
    )
    reply = chat.choices[0].message.content

    return {"score": result, "text": reply}
