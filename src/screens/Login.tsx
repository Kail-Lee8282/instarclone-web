import {
    faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import { routes } from "../routes";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { useMutation } from "@apollo/client";
import { loginUserIn } from "../apollo";
import InstagramLogo from "../components/auth/InstagramLogo";
import { useLocation } from "react-router-dom";
import { IAuthState } from "../components/Shared";
import { graphql } from "../gql";

interface ILogin {
    userName: string,
    password: string,
    result:string,
}

const FacebookLogin = styled.div`
    display: flex;
    color:${props => props.theme.facebookColor};
    cursor: pointer;
    font-weight: 600;
    font-size:14px;
    margin:10px 0px;
    justify-content: center;
    align-items: center;
    svg{
        margin-right: 16px;
        height: 20px;
        width:20px;
    }  
`;

const FormContainer = styled.div`
    width: 100%;
    margin: 15px 0px;
    form{
        margin-top:0px;
    }
`;

const InputContainer = styled.div`
    width: 100%;
    margin:5px 0px;
`;

const Notification = styled.div`
  color:  #2ecc71;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
`;

const LOGIN_MUTATION = graphql(`
    mutation login($userName:String!, $password:String!){
        login(userName:$userName, password:$password){
            ok
            token
            error
        }
    }
`);

function Login() {
    const location = useLocation();

    /**
     * react hook Form
     */
    const state = location.state as IAuthState;
    
    const { register, handleSubmit, formState: { errors, isValid }, setError
        , clearErrors }= useForm<ILogin>({
            mode: "onChange",
            defaultValues:{
                userName: state?.userName || ""
            }
        });

        
    const onValid:SubmitHandler<ILogin> = (data) => {
        if (loading) {
            return;
        }
        const { userName, password } = data;
        login({
            variables: {
                userName, password
            }
        });
        
    }

    //-------------------------------------------------------------------------

    /** Request to Server*/
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted(data) {
            const login = data.login;

            if(!login?.ok){
                return setError("result", {
                    message:login?.error!,
                });
            }
    
            if(login?.token){
                // save token
                loginUserIn(login?.token);
            }
        },
    });


    //console.log(isValid, errors);

    const clearLoginError = () => {
        clearErrors("result");
    }

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <InstagramLogo />
                <FormContainer>
                    <Notification>{location?.state?.message}</Notification>
                    <form onSubmit={handleSubmit(onValid)}>
                        <InputContainer>
                            <Input {...register("userName", { required: "username is required." })}
                                type="text" placeholder="username" hasError={Boolean(errors?.userName?.message)} 
                                onChange={clearLoginError}/>
                            <FormError message={errors?.userName?.message} />
                        </InputContainer>
                        <InputContainer>
                            <Input {...register("password", {
                                required: "password is required.",
                                minLength: { value: 4, message: "Password should be longer than 4 chars." }
                            })}
                                type="password" placeholder="Password"
                                hasError={Boolean(errors?.password?.message)} 
                                />
                            <FormError message={errors?.password?.message} />
                        </InputContainer>
                        <Button type="submit" disabled={!isValid}>
                            {loading ? "Loading..." : "Log In"}
                        </Button>
                        <FormError message={errors?.result?.message} />
                    </form>
                </FormContainer>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account? " link={routes.signUp} linkText="Sign up" />
        </AuthLayout>

    )
}

export default Login;