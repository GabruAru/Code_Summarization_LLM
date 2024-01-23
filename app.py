from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
#from langchain_google_genai import ChatGoogleGenerativeAI
#from langchain.prompts import PromptTemplate
#from langchain.chains import LLMChain

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'your_email@example.com'
app.config['MAIL_PASSWORD'] = 'your_email_password'


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
mail = Mail(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    
    
def send_confirmation_email(email):
    msg = Message('Confirmation Email', sender='your_email@example.com', recipients=[email])
    # Include a verification link in the email body
    msg.body = 'Click the following link to verify your email: http://localhost:3000/verify'
    mail.send(msg)

# Define a variable to keep track of the currently logged in user
current_logged_in_user = None

# Function to check if a user is already logged in
def is_user_logged_in():
    return current_logged_in_user is not None

# Function to set the currently logged in user
def set_logged_in_user(user_id):
    global current_logged_in_user
    current_logged_in_user = user_id

# Function to get the currently logged in user
def get_logged_in_user():
    return current_logged_in_user


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email address is already in use'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    with app.app_context():
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

    # Send confirmation email
    #send_confirmation_email(data['email'])

    return jsonify({'message': 'Registration successful! Verification Email Sent.'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        # Check if another user is already logged in
        print(is_user_logged_in())
        if is_user_logged_in():
            return jsonify({'message': 'Another user is already logged in'})

        # Set the user as logged in
        set_logged_in_user(user.id)

        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401




@app.route('/profile', methods=['GET'])
def profile():
    with app.app_context():
        users = User.query.all()
        user_id = get_logged_in_user()

        if user_id:
            current_user_info = {}
            all_users_info = []

            for user in users:
                if user_id == user.id:
                    current_user_info = {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                else:
                    # Include only the username for other users
                    user_info = {
                        'id': user.id,
                        'username': user.username
                    }
                    all_users_info.append(user_info)
        
            return jsonify({
                'current_user': current_user_info,
                'all_users': all_users_info
            })
        else:
            # User is not logged in
            return jsonify({'message': 'User not logged in'}), 401
        


# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    global current_logged_in_user
    current_logged_in_user = None
    return jsonify({'message': 'Logout successful'})

# edit route
@app.route('/edit', methods=['PUT'])
def edit():
    user_id= get_logged_in_user()
    print(user_id)
    if user_id:
        user = User.query.get(user_id)
        data = request.get_json()
        new_username = data.get('username')
        new_email = data.get('email')
        password = data.get('password')
        if not new_username or not new_email or not password:
            return {'message': 'Invalid input'}, 400

        if not bcrypt.check_password_hash(user.password, password):
            return {'message': 'Invalid password'}, 401
        
        user.username = new_username
        user.email = new_email

        db.session.commit()

        return {'message': 'Update successful'}, 200

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    # Access input values from the request
    language = data.get('language')
    additional_info = data.get('additionalInfo')
    code_to_explain = data.get('codeToExplain')
    desired_output = data.get('desiredOutput')
    selected_tone = data.get('selectedTone')
    selected_language = data.get('selectedLanguage')
    #result = process_input(language, additional_info, code_to_explain, desired_output, selected_tone, selected_language)
    5
    return jsonify({'result': result})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
