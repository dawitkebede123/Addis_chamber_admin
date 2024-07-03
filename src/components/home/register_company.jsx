import React, { useState, useRef } from 'react';
import './edit_form.css'; // Import your CSS file
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore } from 'firebase/database';
import { getStorage,ref as mediaRef, uploadBytes, getDownloadURL } from 'firebase/storage';


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
    // if (!files.length) return; 
    setFormData({
      ...formData,
      [name]: value === undefined ? files[0] : value, // Handle file upload

    });
    // console.log(files[0].name)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if a file is selected (optional, uncomment if needed)
    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }
  
    try {
      writeData(formData)
    //   const storageRef = mediaRef(storage.current, `image2/img.jpg`); // Create storage reference
  
    //   if (storageRef) {
    //     if (!formData.image) {
    //       console.warn('Please select a file to upload.');
    //       return; // Prevent further execution if no file is selected
    //     }
        
    //     console.log(formData.image)
    //     // Ensure formData.image is a valid File object
    //     if (formData.image instanceof File) {
    //       const uploadTask = uploadBytes(storageRef, formData.image);
  
    //       uploadTask.then(
    //         () => { // Wait for upload to complete
    //           console.log(formData); // Log form data for debugging
    //           writeData(formData);   // Call your function to write form data
    //       }
    //     ).catch((error) => { // Handle upload error
    //         console.error('Upload error:', error);
    //       });
    //     }else {
    //       console.error('Invalid file object in formData.image. Please select a file.');
    //     }
    //   } else {
    //     console.error('Error creating storage reference');
    //   }
    } catch (err) {
      console.error('Error during upload:', err);
    } 
    // finally {
      
    }
  // };
  

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
