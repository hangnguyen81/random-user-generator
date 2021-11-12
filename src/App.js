import {FaUserTag, 
        FaEnvelopeOpenText, 
        FaCalendarAlt, 
        FaMapMarkedAlt, 
        FaPhoneVolume, 
        FaRegUser} from 'react-icons/fa';

import {useState, useEffect} from 'react';

const url = 'https://randomuser.me/api/'
const defaultUser = {
  fullname: 'Random User',
  imgUrl: '/pic_01.jpg',
  email: 'random.user@email.com',
  age: 42,
  address: '1234 Random Stress, City, Country',
  phone: '046-234-3234',
  username:'random.username'
}

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const fetchUser = async () =>{
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const randomUser = data.results[0];
      // destructuring
      const {first, last} = randomUser.name;
      const {phone, email} = randomUser;
      const {age} =randomUser.dob;
      const {large: imgUrl} = randomUser.picture;
      const {street:{number, name}, city, country} = randomUser.location;
      const {username} = randomUser.login
  
      const newUser={
        fullname: `${first} ${last}`,
        age,
        phone,
        email,
        imgUrl,
        address:`${number} ${name}, ${city}, ${country}`,
        username 
      }
      setUser(newUser);      
      setValue(newUser.fullname)
    } catch (error) {
      console.log(error);
      setUser(defaultUser);
      setValue(defaultUser.fullname)
    }
    setTitle('fullname')
    setLoading(false);
  }

  useEffect(()=>{
    fetchUser();
  },[])

  const handleValue = (e) =>{
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(user[newValue])
    }
  }

    return (
      <main className='main'>
        <div className='block'>
          <h2 className='title'>USER GENERATOR</h2>
        </div>
        <div className='user-card'>
          <img src={user.imgUrl} alt='avatar of user'/>
          <p className='user--title'>My {title} is</p>
          <p className='user--value'> {value}</p>
          <div className='value--list'>
            <button className='icon' data-label='fullname' onMouseOver={handleValue}><FaUserTag/></button>
            <button className='icon' data-label='email'onMouseOver={handleValue}><FaEnvelopeOpenText/></button>
            <button className='icon' data-label='age' onMouseOver={handleValue}><FaCalendarAlt/></button>
            <button className='icon' data-label='address'onMouseOver={handleValue}><FaMapMarkedAlt/></button>
            <button className='icon' data-label='phone'onMouseOver={handleValue}><FaPhoneVolume/></button>
            <button className='icon'data-label='username' onMouseOver={handleValue}><FaRegUser/></button>
          </div>
          <button className='btn' onClick={fetchUser}>{loading ? 'loading...' : 'random user'}</button>
        </div>
      </main>
    )
}

export default App

