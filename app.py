from flask import Flask, render_template, jsonify, request
from flask.ext.pymongo import PyMongo
from datetime import date
from calendar import Calendar

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'sample'

mongo = PyMongo(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/month')
def month():
    t = date.today()
    year = request.args.get('year', t.year, type=int)
    month = request.args.get('month', t.month, type=int)
    weeks = Calendar().monthdatescalendar(year, month)

    result = []
    for i, week in enumerate(weeks):
        result.append([])
        for d in week:

            assignment_data = mongo.db.idols.find_one({
                'year': d.year,
                'month': d.month,
                'date': d.day,
            })

            data = {
                'year': d.year,
                'month': d.month,
                'date': d.day,
                'memberList': []
            }
            if assignment_data is not None:
                data['memberList'].append(
                    assignment_data['members'][0]['name']
                )

            result[i].append(data)

    return jsonify(result=result)


@app.route('/assign')
def assign():
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    date = request.args.get('date', type=int)
    member = request.args.get('member')

    mongo.db.idols.insert(
        {
            'year': year,
            'month': month,
            'date': date,
            'members': [
                {
                    'name': member
                }
            ],
        }
    )
    result = {
        'name': member
    }
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
