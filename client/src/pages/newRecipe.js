import React, {useContext, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function NewRecipe() {
    const {authState} = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues ={
        title: "",
        stepsText: ""
    };

    useEffect(()=>{
        if (!authState.status){
            navigate("/login");
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        stepsText: Yup.string().required(),
    });

    const onSubmit = (data) => {

        axios
        .post("http://localhost:3001/recipes", data, {headers: {accessToken: localStorage.getItem('accessToken')},
        })
        .then((response)=>{
            navigate('/');
        });
    };



    return (
        <div className='createRecipePage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field id="inputCreateRecipe" name="title" placeholder="(Title)"/>
                    <label>Steps: </label>
                    <ErrorMessage name="stepsText" component="span"/>
                    <Field id="inputCreateRecipe" name="stepsText" placeholder="(Steps)"/>
                    <button type='submit'> Add Recipe </button>
                </Form>
            </Formik>
        </div>
   );
}

export default NewRecipe;