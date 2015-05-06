from flask import Flask, render_template, jsonify, request
from datetime import date
from calendar import Calendar

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/month')
def month():
    t = date.today()
    year = request.args.get('year', t.year, type=int)
    month = request.args.get('month', t.month, type=int)
    weeks = Calendar().monthdatescalendar(year, month)
    result = [[{'year': d.year,
                'month': d.month,
                'date': d.day,
                'memberList': []} for d in week]
              for week in weeks]
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
