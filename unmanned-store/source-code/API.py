from flask import *
import json
from main import detect
import requests

app = Flask(__name__)
data_set = {
    "uuid" : "",
    "cust_id" : "" ,
    "exit" : "",
    "shopping_list" : "",
    "new_status" : False
}
@app.route("/", methods=["GET", "POST"])
def home_page():
    # if request.headers.get('Content-Type') == 'application/json':
    #     data_set = request.json
    # else:
    #     data_set = {"sample": "This is my first API"}

    # return render_template('LandingPage.html', value=data_set)
    return render_template("LandingPage.html")

@app.route("/page-shopping",methods=["GET", "POST"])
def shopping_page():
    return render_template("shoppingList.html", value = data_set)

@app.route("/app/loginSign")
def login_signUp_page():
    return render_template("LogSignPage.html")

@app.route("/app/pageSelect")
def selection_page():
    return render_template("SelectPage.html")

@app.route("/app/pageSelect/topUpSelect")
def topUpSelect():
    return render_template("TopupSelecatPage.html")

@app.route("/app/pageSelect/topUpSelect/topUp")
def topUp():
    return render_template("Topup.html")

@app.route("/app/pageSelect/reimbursement")
def reimbursement_page():
    return render_template("reimbursement.html")

@app.route("/capture-shoppingList", methods=["POST"])
def capture_shoppingList():
    data = request.get_json()
    # data = {
    #     "uuid": "63:77:5E:05",
    #     "cust_id": "654321",
    #     "exit": "2023-12-212T22:30:00.231Z"
    # }
    shopping_dict = {}
    uuid = data["uuid"]
    cust_id = data["cust_id"]
    exit_val = data["exit"]
    for i in detect()["shopping_list"]:
        if f"{i}" in shopping_dict:
            shopping_dict[f"{i}"] += 1
        else:
            shopping_dict[f"{i}"] = 1

    data_set["uuid"] = uuid
    data_set["cust_id"] = cust_id
    data_set["exit"] = exit_val
    data_set["shopping_list"] = shopping_dict 
    data_set["new_status"] = True

    # response_output = {
    #     "uuid": uuid,
    #     "cust_id": cust_id,
    #     "exit": exit_val,
    #     "shopping_list": shopping_dict
    # }

    return data_set

@app.route("/get_status", methods=["GET"])
def get_status():
    response_output = data_set
    return response_output

@app.route("/confirm_order", methods=["GET"])
def confirm_order():
    data_set["uuid"] = "uuid"
    data_set["cust_id"] = ""
    data_set["exit"] = ""
    data_set["shopping_list"] = "" 
    data_set["new_status"] = False

    return data_set

if __name__ == "__main__":
    app.run(port=7777, debug=True)