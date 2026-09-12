import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styling/Plg.css";
export const Plg = () => {
    const [input , setInput] = useState(false);
    const location = useLocation();
    const { Value } = location.state || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput(true);
    }

    const handlevalue = (data) => {
        if (Value && Value[data]) {
            return Value[data];
        }
        return '';
    }

  return (
    <div className="plg">
        <h1>Personalized Lifestyle Guide</h1>
        {!input &&
        <> 
            <h1>Please provide your data for your personalized lifestyle guide.</h1>
            <form onSubmit={handleSubmit}> 
                <div className="feilds">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required defaultValue={handlevalue("name")}/>
                </div>

                <div className="feilds">
                    <label htmlFor='gender'>Gender:</label>
                    <input type="radio" id="male" name="gender" value="male" required defaultChecked={handlevalue("gender") === "male"} />
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" value="female" required defaultChecked={handlevalue("gender") === "female"} />
                    <label htmlFor="female">Female</label>
                    <input type="radio" id="other" name="gender" value="other" required defaultChecked={handlevalue("gender") === "other"} />
                    <label htmlFor="other">Other</label>
                </div>

                <div className="feilds">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" required defaultValue={handlevalue("age")} />
                </div>

                <div className="feilds">
                    <label htmlFor='BP'>Blood Pressure:</label>
                    <input type="radio" id="bp" name="BP" value="1" required defaultChecked={handlevalue("BP") === "1"} />
                    <label htmlFor="bp">Yes</label>
                    <input type="radio" id="bp" name="BP" value="0" required defaultChecked={handlevalue("BP") === "0"} />
                    <label htmlFor="bp">No</label>
                </div>

                <div className="feilds">
                    <label htmlFor='heartdisease'>Heart Disease:</label>
                    <input type="radio" id="heartdisease" name="heartdisease" value="1" required defaultChecked={handlevalue("heartdisease") === "1"} />
                    <label htmlFor="heartdisease">Yes</label>
                    <input type="radio" id="heartdisease" name="heartdisease" value="0" required defaultChecked={handlevalue("heartdisease") === "0"} />
                    <label htmlFor="heartdisease">No</label>
                </div>

               <div className="feilds">
                    <label>Smoking Status:</label>
                    <select required id='smoking' name='smoking' defaultValue={handlevalue("smoking")}>
                        <option value="">Select...</option>
                        <option value="current" name="smoking">Current</option>
                        <option value="ever" name="smoking">Ever</option>
                        <option value="former" name="smoking">Former</option>
                        <option value="never" name="smoking">Never</option>
                        <option value="No Info" name="smoking">No Info</option>
                        <option value="not current" name="smoking">Not Current</option>
                    </select>
               </div>



               <div className="feilds">
                    <label htmlFor='bmi'>BMI:</label>
                    <input type='number' step="0.01" id='bmi' name='bmi' defaultValue={handlevalue("bmi")} />
               </div>

               <div className="feilds">
                    <label htmlFor='hba1c'>HbA1c:</label>
                    <input type='number' step="0.01" id='hba1c' name='hba1c'defaultValue={handlevalue("hba1c")} />
               </div>

               <div className="feilds">
                    <label htmlFor='glucose'>Glucose Level:</label>
                    <input type='number' step="0.01" id='glucose' name='glucose' defaultValue={handlevalue("glucose")} />
               </div>

               <div className="feilds">
                   <label htmlFor="foodpreference">Food Preference:</label>
                    <select id="foodpreference" name="foodpreference">
                    <option value="">Select...</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="both">Both(Veg & Non-Veg)</option>
                </select>
               </div>
                <div className="feilds">
                    <label htmlFor="disease">Any Other disease?</label>
                    <select id="disease" name="disease" defaultValue={handlevalue("disease")}>
                        <option value="">Select...</option>
                        <option value="diabetes">Diabetes</option>
                        <option value="obesity">Obesity</option>
                        <option value="cardio">Cardiovascular Disease</option>
                        <option value="bp">BP</option>
                        <option value="rashes">Rashes</option>
                        <option value="none">No Disease</option>
                    </select>
                </div>
                <button type="submit" >Submit</button>
            </form>
        </>
      }
        {input && <p>Form submitted successfully!</p>}
    </div>
  )
}
