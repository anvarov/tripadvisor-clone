from flask import jsonify
from app import app
from app.forms import LoginForm


@app.route('/api/user/signin', methods=['get', 'post'])
def sign_in():
    form = LoginForm()
    print('works')
    # csrt_generated = form.generate_csrf()
    csrf_tag = form.csrf_token()
    # csrf_tag = 'sds'
    if form.validate_on_submit():
        print('validated')
        return jsonify({'username': form.username.data})
    print(form['csrf_token'].data, 'data csrf')
    return jsonify({'csrf_tag': csrf_tag})
