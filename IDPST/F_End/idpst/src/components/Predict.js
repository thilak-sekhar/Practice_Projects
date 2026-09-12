import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Predict.css';
export const Predict = () => {
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const[data, setData] = useState({'name': '', 'gender': '', 'age': '', 'BP': '', 'heartdisease': '', 'smoking': '', 'bmi': '', 'hba1c': '', 'glucose': ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const formData = new FormData(e.target);
        setData({
            ...data,
            name: formData.get('name'),
            gender: formData.get('gender'),
            age: formData.get('age'),
            BP: formData.get('BP'),
            heartdisease: formData.get('heartdisease'),
            smoking: formData.get('smoking'),
            bmi: formData.get('bmi'),
            hba1c: formData.get('hba1c'),
            glucose: formData.get('glucose')
    });
    }

    const handlePlg = () => {
        navigate('/plg',{
            state: {
                Value: data
            }
        });
    }

  return (
    <div className="predictForm">
        {!submitted && (
            <>
                <h1 className='predictHeading'>Diabetic Risk Prediction Form</h1>
                <h4>Enter Your Details</h4>
                <form className='form' onSubmit={(e) => handleSubmit(e)}>
                    <center><table>
                        <tbody>
                        <tr>
                            <td>
                                <label htmlFor="name">Name:</label>
                            </td>
                            <td>
                                <input type="text" id="name" name="name" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='gender' id="gender" name="gender" required>Gender:</label>
                            </td>
                            <td>
                                <input type="radio" id="male" name="gender" value="male" required />
                                <label htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="female" required />
                                <label htmlFor="female">Female</label><br />
                                <input type="radio" id="other" name="gender" value="other" required />
                                <label htmlFor="other">Other</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="age">Age:</label>
                            </td>
                            <td>
                                <input type="number" id="age" name="age" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='BP'>Blood Pressure:</label>
                            </td>
                            <td>
                                <input type="radio" id="bp" name="BP" value="1" required />
                                <label htmlFor="bp">Yes</label>
                                <input type="radio" id="bp" name="BP" value="0" required />
                                <label htmlFor="bp">No</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='heartdisease'>Heart Disease:</label>
                            </td>
                            <td>
                                <input type="radio" id="heartdisease" name="heartdisease" value="1" required />
                                <label htmlFor="heartdisease">Yes</label>
                                <input type="radio" id="heartdisease" name="heartdisease" value="0" required />
                                <label htmlFor="heartdisease">No</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Smoking Status</label>
                            </td>
                            <td>
                               <select required id='smoking' name='smoking'>
                                    <option value="">Select...</option>
                                    <option value="current" name="smoking">Current</option>
                                    <option value="ever" name="smoking">Ever</option>
                                    <option value="former" name="smoking">Former</option>
                                    <option value="never" name="smoking">Never</option>
                                    <option value="No Info" name="smoking">No Info</option>
                                    <option value="not current" name="smoking">Not Current</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='bmi'>BMI</label>
                            </td>
                            <td>
                               <input type='number' step="0.01" id='bmi' name='bmi'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='hba1c'>HbA1c</label>
                            </td>
                            <td>
                               <input type='number' step="0.01" id='hba1c' name='hba1c' />
                            </td>
                        </tr>
                        <tr>
                            <td>
                               <label htmlFor='glucose'>Glucose Level</label>
                            </td>
                            <td>
                               <input type='number' step="0.01" id='glucose' name='glucose' />
                            </td>
                        </tr>
                        </tbody>
                    </table></center>
                    <button className='submitForm' >Submit</button>
                </form>
            </>
        )}
        {submitted && (
            <div className='result'>
                <h2>
                    <div className='subHeading'>Test Result</div>
                    <br />
                    <div className='outcome'>(outcome)</div>
                </h2>
                <h2><div className='predictionScore'>Risk Level: </div><div className='outcome'>(prediction score)</div></h2>
                <span><h3 className='explanation'>Explanation:</h3>(Detailed Explanation)</span>
                <br />
                <br />

                <span>
                    <button className='button'>Download Report</button>
                    <button className='button' onClick={() => handlePlg()}>PLG</button>
                </span>
            </div>
        )}
    </div>
  )
}
