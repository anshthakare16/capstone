document.addEventListener('DOMContentLoaded', () => {
  const classDropdown = document.getElementById('classSelect');

  const studentDropdowns = [
    document.querySelector('select[name="member1"]'),
    document.querySelector('select[name="member2"]'),
    document.querySelector('select[name="member3"]'),
    document.querySelector('select[name="member4"]')
  ];

  const mentorDropdowns = [
    document.querySelector('select[name="mentor1"]'),
    document.querySelector('select[name="mentor2"]'),
    document.querySelector('select[name="mentor3"]'),
    document.querySelector('select[name="mentor4"]')
  ];

  const mentors = [
    "Jyoti Khurpude (Mante)", "Sanjivani Kulkarni", "Mrunal Fatangare", "Hemlata Ohal",
    "Farahhdeeba Shaikh", "Prerana Patil", "Yogesh Patil", "Vilas Rathod",
    "Pradeep Paygude", "Kajal Chavan", "Megha Dhotey", "Pallavi Nehete",
    "Nita Dongre", "Mrunal Aware", "Shilpa Shitole", "Vaishali Langote", "Sulkshana Malwade"
  ];

  // Hardcoded student data
  const studentsAIDS = [
    "Vedant Prakash Parab", "Gujar Yash Nilesh", "Shriya Shirish Sabnis", "Gauri Revaji Auti",
    "Biswas Aaliya Sohail", "Sanika Kiran Deshmukh", "Kshitij Vijay Shinde", "Ansh Dnyaneshwar Thakare",
    "Rutav Ritesh Mehta", "Tejas Deepak Maskar", "Shaurya Ajay Panhale", "Shaikh Mehran Majid",
    "Yash Ganesh Gadiwan", "Sreejit Majumder", "Amrute Aaryan Jitendra", "Vivaan Varun Mathur",
    "Vedika Kapoor", "Soham Sachin Vidhate", "Shravani Kiran Ruikar", "Om Vinayak Honrao",
    "Darshan Vinayak Nayak", "Manish Narayan Shinde", "Patil Vedika Dilip", "Manthan Moondra",
    "Gargi Avinash Yekhande", "Ritvik Yogesh Kamble", "Isha Gajanan Kuchekar", "Prathamesh Nilesh Tupe",
    "Aditya Prashant Bodke", "Lavya Singh Chauhan", "Toshika Mukesh Bansal", "Patil Vaibhavi Satish",
    "Saanvi Jeetendra Dhakane", "Shreyash Shammi Ranjan", "Aadi Vishal Hanumante", "Soham Nigam",
    "Rishabh Shreyans Patani", "Pranshu Singh", "Sarvesh Rakesh Alai", "Tanish Nstrnfts Bhavsar",
    "Aryan Niranjan More", "Daksh Paul", "Isha Pashant Kale", "Harsh Sunil Gidwani", "Pushkar Rakesh Patil",
    "Aishi Anurag Srivastava", "Anushka Nitin Ugale", "Vansh Parashar", "Gayatri Pravin Swami",
    "Samarth Mahesh Bolkotgi", "Nakshatra Kakani", "Jain Suneri Amit", "Shelke Yash Kishor",
    "Vrunda Kirtibhai Borisagar", "Zoya Yunus Sayyad", "Anaya Sharma", "Nema Essha", "Gaiki Lokesh Abhijit",
    "Ojas Rajshekhar Lature", "Ghodke Aahan Sachin", "Sujay Heramb Rasal", "Ajinkya Dattu Sonawane",
    "Manmohan Shrinivas Parge", "Shivtej Dipak Gaikwad", "Wagh Yashraj Nitin", "Anushka Manoj Wani",
    "Vidhi Rohan Rathod", "Aryan Amar Jadhav", "Raj Umesh Shinde", "Tanishka Rajendra Parkale",
    "Sakshi Kiran Talegaonkar", "Shashwath Chandrashekhar Shinde", "Hardik Dhanraj Chaudhary",
    "Drishti Rahul Rathod", "Nicket Shah", "Reet Kaur Bhasin", "Parth Prashant Tupe",
    "Vallabh Shahaji Pawar", "Aashka Akash Porwal", "Samuel Shadrak Chol"
  ];

  const studentsCSA_A = [
    "Daksh Sharma", "Tanmay Pravin Tate", "Deven Sharad Kshirsagar", "Aarush Pradeep Kote",
    "Lokhande Sejal Manoj", "Darshan Dhananjay Jagtap", "Rushil Jain", "Deshmukh Ayush Ashish",
    "Kadam Vaishnavi Shailendra", "Pawar Yuvraj Shailesh", "Bhorkar Jay Anand", "Hoshmit Rajesh Mahajan",
    "Vaidehee Susheel Belan", "Bhakti Dinesh Joshi", "Atharv Gajanan Chaware", "Kulkarni Avaneesh Yogesh",
    "Samihan Raj Sandbhor", "Riddhesh Yogesh Patil", "Londhe Rohan Rohit", "Sairam Sachin Pardeshi",
    "Om Sachin Pardeshi", "Aryan Madhukar Shinde", "Ishani Amol Badhe", "Bhamodkar Samruddhi Sandip",
    "Shaikh Saad Imran", "Shlok Chaitanya Shah", "Jog Arjun Kedar", "Purva Swanand Deshmukh",
    "Janavi Honrao", "Ranavare Ishan Nitin", "Abhiraj Pradeep Borade", "Goluguri Sulieman",
    "Ayush Chandrashekhar Pasalkar", "Aarushi Pankaj Jawale", "Deshpande Aarya Aniruddha", "Ishan Bhushan Dhaneshwar",
    "Jadhav Nikhil Raju", "Shaurya Rohit Shewale", "Telagamreddy Purnasai Saatvik", "Anish Chaitanya Rashinkar",
    "Aditya Singh Chauhan", "Aditya Jaydeep Shevate", "Lalit Vijay Patil", "Nimish Bhojraj Lanjewar",
    "Aditya Anil Patil", "Bhargav Athreya Munnaluri", "Pardeshi Samiksha Bipin", "Om Santosh Desai",
    "Aranya Nath Misra", "Armaan Kumar Rana", "Pilmenraj Glen Leslie", "Shwetank Prafulla Patil",
    "Nidhi Umakant Thakare", "Ashkan Altaf Tamboli", "Deep Dilip Salunkhe", "Krishnaraj Ravindra Shinde",
    "Aayush Abhijeet Patil", "Shivam Sachin Honrao", "Arnav Tushar Gandre", "Isha Satish Thube",
    "Attar Saniya Sameer", "Simran Ramdayal Ray", "Deokar Durva Dilip", "Vaidehi Prashant Mane",
    "Vedant Sachin Muthiyan", "Kelkar Amogh Amit", "Kulkarni Ashutosh Ashish", "Taniska Ashish Dhanlonhe",
    "Yognandan Narayan Bhere", "Avani Pravin Chandsare", "Giridhar Krishna Sunil", "Harshavardhan Kailas Sasar",
    "Samarth Shivaji Kokate", "Raj Deepak Chavan"
  ];

  const studentsCSE_B = [
    "Reeya Mandar Keskar", "Radha Prasad Kurhekar", "Deshmukh Aarya Dhananjay", "Aryan Swanand Kulkarni",
    "Khushal Sanjay Diwate", "Ayush Prashant Patil", "Apeksha Ishtaling Parashetti", "Amar Nath Dwivedi",
    "Vaishnav Maruti Kaspate", "Kulkarni Sanchita Suhas", "Pawar Rushikesh Pramod", "Aarti Dashrath Raut",
    "Gadiya Niraj Nandlal", "Reet Jeevan Shewale", "Oswal Vidhi Hasmukh", "Ananya Rohidas Gawari",
    "Samarth Sachin Ghenand", "Tanisha Jitesh Gandhi", "Giri Unmesh Prakash", "Omkar Surendra Purav",
    "Siddhant Yogesh Pasalkar", "Aniket Abhay Joshi", "Desai Vedang Dipesh", "Kshiteej Abhijeet Toradmal",
    "Priyal Gulab Patil", "Radhika Sanjay Sogam", "Yash Dnyaneshwar Narale", "Khushi Rupareliya",
    "Nair Vinit Biju", "Shifa Murad Khan", "Khushi Manoj Patil", "Ibrahim Abdul Jalil Kache", 
    "Pathare Tanishk Santosh", "Tamobli Nakul Atul", "Patil Sarthak Vitthal", "Aryan Bajirao Suryawanshi",
    "Shaikh Zidan Ghudusab", "Vyas Tanmay Navaratan", "Takawale Siddhi Sunil Vaishali", "Jaid Vedant Satish",
    "Abhinav Raj", "Bhilare Vedant", "Date Vangmayee Tushar", "Harsh Harihar Kulkarni", "Mote Shravani Shantanu",
    "Ishan Rahul Jabade", "Anirudha Sachin Thite", "Ankit Amol Gaware", "Maithili Mahesh Pene",
    "Motwani Riya Jay", "Archit Anil Kadam", "Sparsh Sagar Doshi", "Palak Pankaj Gadhari",
    "Mohammad Rehan Mushahid Ansari", "Pawar Prithviraj Chandrakant", "Yadav Samruddhi Anish Padmashree",
    "Rasane Arnav Manoj", "Swasti Pravin Shinde", "Vedant Raju Ilag", "Ganjave Tanaya Prashant",
    "Mann Singhvi", "Durvank Pankaj Borole", "Vaishnavi Prakash Jadhav", "Pratham Nanagiri",
    "Abhilasha Manoj Gandhi", "Rajarshi Ishita Sandeep", "Tejas Sachin Shelar", "Saarth Vipin Borole",
    "Masul Aryan Hilal", "Kanojia Palak Prashant", "Pratik Bipinkumar Mishra", "Shinde Atharva Rohidas",
    "Aditya Prakash Kunjir", "Pranav Aravindrao Suryawanshi", "Kushagri Saxena"
  ];

  let students = [];

  // Handle class selection
  classDropdown.addEventListener('change', (e) => {
    const selectedClass = e.target.value;
    if (selectedClass === 'AIDS') {
      students = studentsAIDS;
    } else if (selectedClass === 'CSA_A') {
      students = studentsCSA_A;
    } else if (selectedClass === 'CSE_B') {
      students = studentsCSE_B;
    }
    populateStudentDropdowns();
    populateMentorDropdowns();
  });

  // Populate student dropdowns based on selected class
  function populateStudentDropdowns() {
    studentDropdowns.forEach(dropdown => {
      dropdown.innerHTML = '';
      students.forEach(student => {
        const option = document.createElement('option');
        option.value = student;
        option.textContent = student;
        dropdown.appendChild(option);
      });
    });
  }

  // Populate mentor dropdowns
  function populateMentorDropdowns() {
    mentorDropdowns.forEach(dropdown => {
      dropdown.innerHTML = '';
      mentors.forEach(mentor => {
        const option = document.createElement('option');
        option.value = mentor;
        option.textContent = mentor;
        dropdown.appendChild(option);
      });
    });
  }

  // Initialize on page load
  populateStudentDropdowns();
  populateMentorDropdowns();

  // Handle form submission
  document.getElementById("teamForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const classSelect = document.getElementById("classSelect").value;
    const members = [
      document.querySelector('select[name="member1"]').value,
      document.querySelector('select[name="member2"]').value,
      document.querySelector('select[name="member3"]').value,
      document.querySelector('select[name="member4"]').value,
    ];
    const mentors = [
      document.querySelector('select[name="mentor1"]').value,
      document.querySelector('select[name="mentor2"]').value,
      document.querySelector('select[name="mentor3"]').value,
      document.querySelector('select[name="mentor4"]').value,
    ];
    const ideas = [
      document.querySelector('textarea[name="idea1"]').value,
      document.querySelector('textarea[name="idea2"]').value,
      document.querySelector('textarea[name="idea3"]').value,
    ];

    // Validate form fields
    if (!classSelect || members.includes("") || mentors.includes("") || ideas.includes("")) {
      alert("⚠️ Please fill all fields before submitting.");
      return;
    }

    // Construct team data object
    const teamData = {
      class: classSelect,  // Send the selected class to Netlify Function
      members,             // Array of student members
      mentors,             // Array of selected mentors
      ideas                // Team ideas (array of strings)
    };

    try {
      // Send data to Netlify Function (submitTeam.js)
      const res = await fetch("/.netlify/functions/submitTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(teamData)  // Send the structured team data
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Your team was registered!");
        document.getElementById("teamForm").reset();

        // Re-populate the student dropdowns based on selected class
        document.getElementById("classSelect").dispatchEvent(new Event("change"));

        // Re-populate mentor dropdowns
        populateMentorDropdowns();
      } else {
        alert("❌ Error: " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("❌ Failed to submit team. Please try again later.");
    }
  });
});
