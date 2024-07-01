import React, { useState, useRef } from 'react';
import './edit_form.css'; // Import your CSS file
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAeHg32VjgFEPlnwQ1djM1krCQ3lz8GDUY",
  authDomain: "chamber-60982.firebaseapp.com",
  databaseURL: "https://chamber-60982-default-rtdb.firebaseio.com",
  projectId: "chamber-60982",
  storageBucket: "chamber-60982.appspot.com",
  messagingSenderId: "1037511136316",
  appId: "1:1037511136316:web:b7b7dbbb55478ec9ef1f39",
  measurementId: "G-WRCCQRZC52"

};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const database = firebase.database();

const writeData = async (data) => {
  let inputData = {
    'Account Name':data.name,
    'Email': data.email,
    'Tel': data.tel,
    'Mobile':data.mobile,
    'Website':data.website,
    'Is-adv':data.image|| data.video|| data.logo!=null?true:false,
    'Image':data.image==null?'':data.image,
    'Profile':data.profile,
    'Sector':data.sector,
    'Sub-Sector':data.sub_sector,
    'Video':data.video==null?'':data.video,
    'Category':data.category,
    'logo':data.logo==null?'':data.logo,
    'status':'',
   };
  //  try {
    if(data.category=='business'){
      const newRef = await push(ref(database, 'Query10'));
      console.log('saving');
      const rf = set(newRef,inputData)
      await set(rf)
    }
    else{

      const newRef = await push(ref(database, 'Almanac'));
    console.log('saving');
    const rf = set(newRef,inputData)
    await set(rf)
    }
    
  // } catch (error) {
  //   console.error('Error writing data:', error);
  //   // Handle error appropriately
  // }
  }
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    tel:'',
    mobile:'',
    email: '',
    website:'',
    profile: '',
    sector:'',
    sub_sector:'',
    category:'business',
    image:null,
    video:null,
    logo:null,
    // file: null,
  });

  const storage = useRef(getStorage()); // Reference to Firebase Storage
 
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    setFormData({
      ...formData,
      [name]: value === undefined ? files[0] : value, // Handle file upload
    });
    // console.log(files[0].name)
  };

  const handleSubmit = async (event) => {
    

    event.preventDefault();

    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }

    try {
      const storageRef = ref(storage.current, `uploads/${formData.file.name}`); // Create storage reference
      const uploadTask = uploadBytes(storageRef, formData.file);

      // Display progress bar or loading indicator (optional)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress, '%');
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle upload errors (e.g., display error message to user)
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('File uploaded successfully:', downloadURL);

          // Send data to your backend (adjust based on your setup)
          // You can send formData including the downloadURL

          setFormData({ name: '', email: '', profile: '', file: null }); // Clear form
        }
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle general form submission errors
    
    }
    console.log(formData)
    writeData(formData)
  }

  return (
    <form className="beautiful-form" onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </li>
        <li>
          <label htmlFor="tel">Telephone Number:</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Enter telephone number"
            
          />
        </li>
        <li>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            
          />
        </li>
        <li>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            
          />
        </li>
        <li>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website"
            
          />
        </li>
        <li>
          <label htmlFor="sector">Sector</label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            placeholder="Enter sector"
            required
          />
        </li>
        <li>
          <label htmlFor="sub_sector">Sub-Sector</label>
          <input
            type="text"
            id="sub_sector"
            name="sub_sector"
            value={formData.sub_sector}
            onChange={handleChange}
            placeholder="Enter sub-sector"
            required
          />
        </li>
        <li>
          <label htmlFor="category">Category</label>
          <select 
          type="text"
          id="category"
          name="category"
           value={formData.category}
           onChange={handleChange}
          // defaultValue={'business'}
          required
          >
            <option selected>Business</option>
            <option>Almanac</option>
          </select>
        </li>
        <li>
          <label htmlFor="profile">Profile</label>
          <textarea
            id="profile"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            
            placeholder="Write company profile here"
          
          ></textarea>
        </li>
        <li>
          <label htmlFor="logo">logo</label>
          <input
            type="file"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            accept=".jpg,.png" // Specify allowed file types (optional)
          />
        </li>
        <li>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            accept=".jpg,.png" // Specify allowed file types (optional)
          />
        </li>
        <li>
          <label htmlFor="video">Video</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={handleChange}
            value={formData.video}
            accept=".mp4" // Specify allowed file types (optional)
          />
        </li>
        <li>
        <button type="submit">Registration</button>
      
        </li>
        
      </ul>
    </form>
  );
};

export default RegisterForm;
