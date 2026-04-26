from flask import *

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def home():
    if request.headers.get('Content-Type') == 'application/json':
        data_set = request.json
    else:
        data_set = {"sample": "Hello world"}
    return render_template('shoppingList.html', value=data_set)

if __name__ == '__main__':
    app.run(debug=True)