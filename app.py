import streamlit as st
import pandas as pd
import os
from datetime import datetime

# Setup
st.set_page_config(page_title="Capstone Registration", layout="wide")

# Custom CSS for gradient background and button styling
st.markdown("""
    <style>
        body {
            background: linear-gradient(to right, #FF4B4B, #FF6A6A);
            color: white;
            font-family: 'Arial', sans-serif;
        }
        .stButton>button {
            background-color: #FF4B4B;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        .stButton>button:hover {
            background-color: #FF6A6A;
        }
        .stTextInput>div>input {
            background-color: #FF6A6A;
            color: white;
        }
        .stTextInput>div>label {
            color: white;
        }
        .stSelectbox>div>div>input {
            background-color: #FF6A6A;
            color: white;
        }
        .stSelectbox>div>div>label {
            color: white;
        }
        /* Logout button styling */
        .logout-btn button {
            background-color: #f44336;
            color: white;
        }
        .logout-btn button:hover {
            background-color: #d32f2f;
        }
        /* Back button styling */
        .back-btn button {
            background-color: #2196F3;
            color: white;
        }
        .back-btn button:hover {
            background-color: #0b7dda;
        }
    </style>
""", unsafe_allow_html=True)

# Constants
DEPARTMENTS = ["CSE A", "CSE B", "AIDS"]
MENTORS = [
    "Jyoti Khurpude (Mante)", "Sanjivani Kulkarni", "Mrunal Fatangare", "Hemlata Ohal",
    "Farahhdeeba Shaikh", "Prerana Patil", "Yogesh Patil", "Vilas Rathod",
    "Pradeep Paygude", "Kajal Chavan", "Megha Dhotey", "Pallavi Nehete",
    "Nita Dongre", "Mrunal Aware", "Shilpa Shitole", "Vaishali Langote",
    "Sulkshana Malwade"
]
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "password"
TEAM_COLUMNS = [
    "Member 1", "Member 2", "Member 3", "Member 4",
    "Mentor 1", "Mentor 2", "Mentor 3", "Mentor 4",
    "Idea 1", "Idea 2", "Idea 3", "Timestamp", "Class"
]
STUDENT_FILES = {
    "CSE A": "csa_a_students.csv",
    "CSE B": "cse_b_students.csv",
    "AIDS": "aids_students.csv"
}

# Ensure data folder exists
os.makedirs("data", exist_ok=True)

# Logout function to reset session state
def logout():
    # Reset the page state to initial welcome page
    st.session_state.page = 0
    # Clear any other session variables you might have
    for key in list(st.session_state.keys()):
        if key != "page":  # Keep the page state reset instead of removing it
            del st.session_state[key]

# Load student data
def load_students():
    data = {}
    for dept, file in STUDENT_FILES.items():
        if os.path.exists(file):
            df = pd.read_csv(file)
            if "Name of the Student" not in df.columns:
                df.columns = ["Name of the Student"]
            data[dept] = df
        else:
            data[dept] = pd.DataFrame(columns=["Name of the Student"])
    return data

# Get already registered students
def get_registered_students(department):
    file_path = f"data/teams_{department}.csv"
    if not os.path.exists(file_path):
        return set()
    df = pd.read_csv(file_path)
    registered = set()
    for i in range(1, 5):
        col = f"Member {i}"
        if col in df.columns:
            registered.update(df[col].dropna().values)
    return registered

# Save team data
def save_team_data(department, team_data):
    file_path = f"data/teams_{department}.csv"
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
    else:
        df = pd.DataFrame(columns=TEAM_COLUMNS)
    df.loc[len(df)] = team_data
    df.to_csv(file_path, index=False)

# Welcome page
def welcome_page():
    st.markdown(""" 
        <div style='text-align:center;'>
        <h1>👋 Welcome to <span style='color:#FF4B4B;'>Capstone Registration Portal</span></h1>
        <p>Register your team, select mentors, and submit your innovative ideas!</p>
        </div>
    """, unsafe_allow_html=True)
    if st.button("🚀 Start Registration"):
        st.session_state.page = 1

# Registration flow
def registration_flow():
    # Add back/logout button
    col1, col2 = st.columns([1, 6])
    with col1:
        st.markdown("<div class='back-btn'>", unsafe_allow_html=True)
        if st.button("← Back"):
            st.session_state.page = 1
            st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)
        
    st.subheader("📝 Capstone Team Registration")
    
    dept = st.selectbox("Select your department", DEPARTMENTS)
    students_data = load_students()
    registered = get_registered_students(dept)
    available_students = students_data[dept][~students_data[dept]["Name of the Student"].isin(registered)]["Name of the Student"].tolist()

    st.subheader("👥 Select 4 Unique Team Members")
    member_inputs = []
    for i in range(4):
        member = st.selectbox(f"Member {i+1}", ["-- Select --"] + available_students, key=f"mem{i}")
        member_inputs.append(member)
    team_members = [m for m in member_inputs if m != "-- Select --"]

    st.subheader("🎓 Select 4 Unique Mentors")
    mentor_inputs = []
    for i in range(4):
        mentor = st.selectbox(f"Mentor {i+1}", ["-- Select --"] + MENTORS, key=f"men{i}")
        mentor_inputs.append(mentor)
    selected_mentors = [m for m in mentor_inputs if m != "-- Select --"]

    st.subheader("💡 Submit Your Top 3 Ideas")
    idea1 = st.text_input("Idea 1")
    idea2 = st.text_input("Idea 2")
    idea3 = st.text_input("Idea 3")

    if st.button("📩 Submit Team"):
        if len(team_members) < 4 or len(set(team_members)) < 4:
            st.error("Please select 4 unique team members.")
        elif len(selected_mentors) < 4 or len(set(selected_mentors)) < 4:
            st.error("Please select 4 unique mentors.")
        elif not all([idea1, idea2, idea3]):
            st.error("Please provide all 3 ideas.")
        else:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            full_data = team_members + selected_mentors + [idea1, idea2, idea3, timestamp, dept]
            save_team_data(dept, full_data)
            st.success("✅ Team registered successfully!")
            st.balloons()
            st.markdown("---")
            col1, col2 = st.columns(2)
            with col1:
                if st.button("Register Another Team"):
                    for key in st.session_state.keys():
                        if key.startswith("mem") or key.startswith("men"):
                            del st.session_state[key]
                    st.rerun()
            with col2:
                st.markdown("<div class='back-btn'>", unsafe_allow_html=True)
                if st.button("Return to Home"):
                    logout()
                    st.rerun()
                st.markdown("</div>", unsafe_allow_html=True)

# Admin dashboard
def admin_dashboard():
    st.title("📊 Admin Dashboard")
    
    # Add logout button to top right
    col1, col2 = st.columns([6, 1])
    with col2:
        st.markdown("<div class='logout-btn'>", unsafe_allow_html=True)
        if st.button("🚪 Logout"):
            logout()
            st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)
    
    students_data = load_students()

    for dept in DEPARTMENTS:
        st.subheader(f"📁 {dept} Teams")
        file_path = f"data/teams_{dept}.csv"
        
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            st.write(f"Total teams: {len(df)}")
            st.dataframe(df)
            st.download_button("Download CSV", data=df.to_csv(index=False), file_name=f"teams_{dept}.csv")
        else:
            st.info("No teams registered yet.")

        registered = get_registered_students(dept)
        remaining = students_data[dept][~students_data[dept]["Name of the Student"].isin(registered)]
        st.markdown(f"**Unregistered Students ({len(remaining)}):**")
        st.dataframe(remaining)

    st.markdown("---")
    st.subheader("🧹 Clear Data for a Department")

    dept_to_clear = st.selectbox("Select department to clear data for", DEPARTMENTS)
    if st.button("⚠️ Clear Data"):
        confirm = st.radio("Are you sure?", ["No", "Yes, delete the data"])
        if confirm == "Yes, delete the data":
            file_path = f"data/teams_{dept_to_clear}.csv"
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                    st.success(f"Data for {dept_to_clear} has been cleared.")
                except Exception as e:
                    st.error(f"Error deleting the file: {str(e)}")
            else:
                st.warning(f"No file found for {dept_to_clear} to delete.")

# Admin login
def admin_login():
    st.title("🔐 Admin Login")
    
    # Add back button
    col1, col2 = st.columns([1, 6])
    with col1:
        st.markdown("<div class='back-btn'>", unsafe_allow_html=True)
        if st.button("← Back"):
            st.session_state.page = 1
            st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)
    
    user = st.text_input("Username")
    pwd = st.text_input("Password", type="password")
    if st.button("Login"):
        if user == ADMIN_USERNAME and pwd == ADMIN_PASSWORD:
            st.session_state.page = "dashboard"
            st.rerun()
        else:
            st.error("Invalid credentials")

# Role selection page
def role_selection():
    st.title("Select Your Role")
    
    # Add back button
    col1, col2 = st.columns([1, 6])
    with col1:
        st.markdown("<div class='back-btn'>", unsafe_allow_html=True)
        if st.button("← Back"):
            st.session_state.page = 0
            st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)
    
    option = st.radio("Select your role", ["Team Registration", "Administrator"])
    if st.button("Proceed"):
        if option == "Team Registration":
            st.session_state.page = 2
        else:
            st.session_state.page = "admin"
        st.rerun()

# Navigation
if "page" not in st.session_state:
    st.session_state.page = 0

if st.session_state.page == 0:
    welcome_page()
elif st.session_state.page == 1:
    role_selection()
elif st.session_state.page == 2:
    registration_flow()
elif st.session_state.page == "admin":
    admin_login()
elif st.session_state.page == "dashboard":
    admin_dashboard()
