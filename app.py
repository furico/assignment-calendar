from flask import Flask, render_template, jsonify
from datetime import date
from calendar import Calendar

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/month')
def ping():
    t = date.today()
    cal = Calendar()
    weeks = cal.monthdatescalendar(t.year, t.month)
    result = list()
    for week in weeks:
        result.append([d.day for d in week])

    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
