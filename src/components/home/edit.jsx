import React, { useState, useRef } from 'react';
import './edit_form.css'; // Import your CSS file
import { initializeApp } from 'firebase/app';
import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore, update } from 'firebase/database';
import { Link,useParams,useLocation } from 'react-router-dom';
import { getStorage,putFile, uploadBytes, getDownloadURL } from 'firebase/storage';
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
      try {
        console.log('Fetching data by account name...');
        const queryRef = ref(database, 'Query10');
        const snapshot = await get(queryRef);
    
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const childKey in data) {
            if (data[childKey]['Account Name'] === inputData['Account Name']) {
              const dataRef = ref(database, `Query10/${childKey}`);
              // Delete the existing data (be cautious of data loss)
              await remove(dataRef);
              // Set the updated data at the same reference
              await set(dataRef, inputData);
              console.log('Data updated successfully!');
              break;
            }
          }
        } else {
          console.warn('Data with account name not found.');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } 
    else{
      try {
        console.log('Fetching data by account name...');
        const queryRef = ref(database, 'Query10');
        const snapshot = await get(queryRef);
    
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const childKey in data) {
            if (data[childKey]['Account Name'] === inputData['Account Name']) {
              const dataRef = ref(database, `Almanac/${childKey}`);
              // Delete the existing data (be cautious of data loss)
              await remove(dataRef);
              // Set the updated data at the same reference
              await set(dataRef, inputData);
              console.log('Data updated successfully!');
              break;
            }
          }
        } else {
          console.warn('Data with account name not found.');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
    
  // } catch (error) {
  //   console.error('Error writing data:', error);
  //   // Handle error appropriately
  // }
  }

  const handleDelete = async (data) => {
    let inputData = {
      'Account Name':data.name,
     
     };
    //  try {
      if(data.category=='business'){
        try {
          console.log('Fetching data by account name...');
          const queryRef = ref(database, 'Query10');
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (const childKey in data) {
              if (data[childKey]['Account Name'] === inputData['Account Name']) {
                const dataRef = ref(database, `Query10/${childKey}`);
                // Delete the existing data (be cautious of data loss)
                await remove(dataRef);
                // Set the updated data at the same reference
               
                console.log('Data remove successfully!');
                break;
              }
            }
          } else {
            console.warn('Data with account name not found.');
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      } 
      else{
        try {
          console.log('Fetching data by account name...');
          const queryRef = ref(database, 'Query10');
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (const childKey in data) {
              if (data[childKey]['Account Name'] === inputData['Account Name']) {
                const dataRef = ref(database, `Almanac/${childKey}`);
                // Delete the existing data (be cautious of data loss)
                await remove(dataRef);
                // Set the updated data at the same reference
                console.log('Data remove successfully!');
                break;
              }
            }
          } else {
            console.warn('Data with account name not found.');
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      }
      
    // } catch (error) {
    //   console.error('Error writing data:', error);
    //   // Handle error appropriately
    // }
    }
const EditForm = () => {
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const encodedDataString = queryString.get('data');
  const data = JSON.parse(decodeURIComponent(encodedDataString)); // Decode and parse

  // console.log(data)
  // const data = JSON.parse(itemDataString); // Parse the data string
  // console.log(data)
  const [formData, setFormData] = useState({
    name: data.name,
    tel:data.tel,
    mobile:data.mobile,
    email: data.email,
    website:data.website,
    sector:data.sector,
    sub_sector:data.sub_sector,
    category:data.category,
    profile: data.profile,
    logo: data.logo==null?'':data.logo,
    image:data.image==null?'':data.image,
    video:data.video==null?'':data.video,
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
      const storageRef = ref(storage.current, `image/${formData.image}`); // Create storage reference
      const uploadTask_image =FileReader(storageRef)
      //  uploadBytes(storageRef, formData.image);

      // Display progress bar or loading indicator (optional)
      uploadTask_image.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress, '%');
        },
        (error) => {
          console.error('Error uploading image:', error);
          // Handle upload errors (e.g., display error message to user)
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('Image uploaded successfully:', downloadURL);

          // Send data to your backend (adjust based on your setup)
          // You can send formData including the downloadURL

          setFormData({ name: '', email: '', message: '', file: null }); // Clear form
        }
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle general form submission errors
    }
    // console.log(formData)
    writeData(formData)
  };

  const handleSubmitToDelete = async (event) => {

    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }

   
    handleDelete(formData)
  };

  return (
    <form className="beautiful-form">
      <ul>
        <li>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            defaultValue={formData.name}
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
            type="website"
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
          
          value={formData.category}
          required
          >
            <option>Business</option>
            <option>Almanac</option>
          </select>
        </li>
        <li>
          <label htmlFor="profile">Profile</label>
          <textarea
            type='text'
            id="profiley"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            
            placeholder="Write company profile here"
          
          ></textarea>
        </li>
        <li>
          <label htmlFor="logo">logo</label>
          {data.logo && (
          <p>{data.logo}</p>)}
          <br/>
          <input
            type="file"
            id="logo"
            name="logo"
          
            onChange={handleChange}
            accept=".jpg,.png" // Specify allowed file types (optional)
          />
        </li>
        <li>
          <label htmlFor="file">Image</label>
          {data.image && (
          <p>{data.image} </p>

          )}
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            accept=".jpg,.png" // Specify allowed file types (optional)
          />
        </li>
        <li>
          <label htmlFor="video">Video</label>
          {data.video && (
          <p>{data.video} </p>)}
          <input
            type="file"
            id="video"
            name="file"
            onChange={handleChange}
            accept=".mp4,.gif" // Specify allowed file types (optional)
          />
        </li>
        <li>
        <button type="submit" id='update_btn' onClick={handleSubmit}>Update</button>
        <span/>
        <button onClick={handleSubmitToDelete} id='delete_btn'>Delete</button>
        </li>
        
      </ul>
    </form>
  );
};

export default EditForm;
