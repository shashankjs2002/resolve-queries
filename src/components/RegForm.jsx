import React, {useState} from 'react'
import './styles/RegForm.css'

const RegForm = () => { 
    const [error, setError] = useState(null)
    const [formName, setFormName] = useState('bug-form')

    const changeForm = (formName) => {
        let bugForm = document.getElementsByClassName('form-1')[0]
        let contactDevForm = document.getElementsByClassName('form-2')[0]
        formName==='bug-form' ? (setFormName('bug-form')): (setFormName('contactDev-form'))
        if(formName==='contactDev-form'){
            contactDevForm.style.textDecorationLine ='underline';
            bugForm.style.textDecorationLine ='none'
        }
        else{
            bugForm.style.textDecorationLine ='underline'
            contactDevForm.style.textDecorationLine ='none'
        }
    }
    
    const [iCredential, setICredential] = useState({
        name: "",
        email: "",
        category: "",
        bug: ""
    })
    const [bCredential, setBCredential] = useState({
        name: "",
        email: "",
        contactNumber: "",
        subject: "",
        message: ""
    })

    const onchange = (e) => {
        formName==='bug-form' 
        ?
        setICredential({...iCredential, [e.target.name]: e.target.value})
        :
        setBCredential({...bCredential, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const id = "1nPEgDC7Hft1i-eYLMrhlzRg0W-BOVdOhbZRwJtTCjxw" //YOUR FORM ID
        const id = "1FAIpQLScEjt7Ba7tw9Y0X8hQXoxoHeasLYDAQPeUI4HlF1UJlJGkjfg" //YOUR FORM ID
        // const formUrl = "https://docs.google.com/forms/d/"+ id     +"/formResponse" +`?entry.1045781291=${formData.name}&entry.2005620554=${formData.email}&entry.1065046570=${formData.subject}&entry.839337160=${formData.message}`;
        const formUrl = "https://docs.google.com/forms/d/e/"+ id     +"/formResponse" +`?entry.2005620554=${iCredential.name}&entry.1045781291=${iCredential.email}&entry.1166974658=${iCredential.category}&entry.839337160=${iCredential.bug}`;
        console.log(formUrl)
        try {
            const response = await fetch(formUrl, {
            method: 'POST',
            });
            console.log(response)      
            if(response){
                setError('Bug Reported. Thanks for your feedback!')
                setICredential({
                    name: "",
                    email: "",
                    category: "",
                    bug: ""
                })
            }    
        } catch (error) {   
            setError('Error Occured.Check your network connection.')
        }
    }

    const handlecontactDevSubmit = async (e) => {
        e.preventDefault();
        // const id = "1nPEgDC7Hft1i-eYLMrhlzRg0W-BOVdOhbZRwJtTCjxw" //YOUR FORM ID
        const id = "1FAIpQLScxY57D11rmm30NntDGrhiHGZElicmKcnXMefGtIEFwA7c_3g" //YOUR FORM ID
        // const formUrl = "https://docs.google.com/forms/d/"+ id     +"/formResponse" +`?entry.1045781291=${formData.name}&entry.2005620554=${formData.email}&entry.1065046570=${formData.subject}&entry.839337160=${formData.message}`;
        const formUrl = "https://docs.google.com/forms/d/e/"+ id     +"/formResponse" +`?entry.2005620554=${bCredential.name}&entry.1045781291=${bCredential.email}&entry.1166974658=${bCredential.subject}&entry.1065046570=${bCredential.contactNumber}&entry.839337160=${bCredential.message}`;
        console.log(formUrl)

        try {
            const response = await fetch(formUrl, {
            method: 'POST',
            });
            // console.log(response)      
            if(response){
                setError('Details Submitted! I will contact you soon')
                setBCredential({
                    name: "",
                    email: "",
                    contactNumber: "",
                    subject: "",
                    message: ""
                })
            }    
        } catch (error) {   
            setError('Error Occured.Check your network connection.')
        }
    }
        
    return (
        <>
            <div id='reg' className="regForm">
                <div className="homeContent">
                    <div className="left">
                        <h1>Resolve Queries</h1>
                        {/* <img id='formImg' src={formImg} alt="" /> */}
                    </div>
                    <div className="formSec">
                        <div className="type">
                            <h3>
                                <span id='formTitle' className='form-1' onClick={()=>changeForm('bug-form')}>Report Bug</span>
                                <span id='formTitle'  className='form-2' onClick={()=> changeForm('contactDev-form')}>Contact Developer</span>
                            </h3>
                        </div>
                        {
                            formName==='bug-form' 
                            ?
                            <form id='bug-form' onSubmit={handleSubmit}>
                                <div className='my-form'>
                                    <div className='ans'>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" placeholder='Name'  onChange={onchange} value={iCredential.name} />
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="email">Email Id</label>
                                        <input type="email" name="email" placeholder='Email Id'  onChange={onchange} value={iCredential.email}/>
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="category">Select Application</label>
                                        <select style={{width:'90vw'}} name="category" onChange={onchange} value={iCredential.category}>
                                            <option value="None">--Select--</option>
                                            <option value="Personality-Paws">Personality-Paws</option>
                                            <option value="ATIA">ATIA</option>
                                            <option value="10-News">10-News</option>
                                            <option value="My e-Notes">My e-Notes</option>
                                            <option value="Portfolio">Portfolio</option>
                                            <option value="Textlosion">Textlosion</option>
                                            <option value=".sjs Ransomware">.sjs Ransomware</option>
                                        </select>
                                        {/* <input type="" name="iglink" id="" placeholder='Message' /> */}
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="msg">Bug <span className='star'>*</span> </label>
                                        <textarea required style={{width:'90vw'}} rows='5' type="text" name="bug" placeholder='Bug'  onChange={onchange} value={iCredential.bug}/>
                                    </div>
                                    <div className="ans">
                                        {error}
                                    </div>
                                    <button type="submit" id='btn'>Submit</button>
                                </div>
                            </form>
                        :
                            <form id='contactDev-form'  onSubmit={handlecontactDevSubmit}>
                                <div className='my-form'>
                                    <div className='ans'>
                                        <label htmlFor="name">Your Name <span className='star'>*</span></label>
                                        <input type="text" name="name" placeholder='Your Name'  onChange={onchange} value={bCredential.name} required/>
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="email">Email Id </label>
                                        <input type="email" name="email" placeholder='Email Id'  onChange={onchange} value={bCredential.email} />
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="contactNumber">Contact Number</label>
                                        <input type="number" name="contactNumber" placeholder='Contact Number'  onChange={onchange} value={bCredential.contactNumber}/>
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" name="subject" placeholder='Subject'  onChange={onchange} value={bCredential.subject}/>
                                    </div>
                                    <div className='ans'>
                                        <label htmlFor="message">Message <span className='star'>*</span></label>
                                        <textarea required style={{width:'90vw'}} rows='5' type="text" name="message" placeholder='Type Your Message'  onChange={onchange} value={bCredential.message}/>
                                    </div>
                                    <div className="ans">
                                        {error}
                                    </div>
                                    <button type="submit" id='btn'>Submit</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegForm