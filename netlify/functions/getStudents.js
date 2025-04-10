exports.handler = async function (event, context) {
  const params = new URLSearchParams(event.rawQuery);
  const selectedClass = params.get("class");

  // Check if class parameter is provided
  if (!selectedClass) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Class parameter is missing." })
    };
  }

  // Hardcoded student data for each class
  const studentsData = {
    "AIDS": [
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
    ],
    "CSE A": [
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
    ],
    "CSE B": [
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
      "Ishan Rahul Jabade", "Anirudha Sachin Thite", "Ankit Amol Gaware", "Maithili Mahesh Puranik", 
      "Ankita Dinesh Kulkarni", "Aaditya Om Bhagat", "Chandrakant Suraj Bhavsar", "Ravindra Patil",
      "Trupti Rahul Ranbhise", "Manas Kiran Bhisikar", "Girish Vasant Chavan", "Sreejith Ranjan Joshi", 
      "Vishal Yogesh Sonawane", "Madhavi Bhivgade", "Kshama Dinesh Arwade", "Mohit Gajanan Kharat", 
      "Yash Vishwajeet Gaikwad", "Tanay Sudhakar Shewale"
    ]
  };

  // Retrieve students based on class selection
  const students = studentsData[selectedClass] || [];

  if (students.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "No students found for the selected class." })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(students)
  };
};
