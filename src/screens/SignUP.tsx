import { useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import InstagramLogo from "../components/auth/InstagramLogo";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { FatLink, IAuthState } from "../components/Shared";
import { graphql } from "../gql";
import { routes } from "../routes";

interface IForm {
    email: string,
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
}


const HeaderContainer = styled.div`
  display:flex;
    flex-direction: column;
    align-items: center;
`;
const SubTitle = styled(FatLink)`
    text-align: center;
    margin: 8px 0px;
    font-size: 16px;
`;

const FacebookLoginButton = styled(Button)`
    margin:8px 0px;
    span{
        margin-left:5px;
    }
`;

const FormContainer = styled.div`
    width:100%;
    margin:10px 0px;
    form{
        margin-top: 0px;
    }
`;

const LearnMore = styled.span`
  margin:18px 0px 8px 0px;
  color: ${(props) => props.theme.subFontColor};
  text-align: center;
  font-size: 12px;
  a{
    color: ${(props) => props.theme.subFontColor};
    margin-left:5px;
    font-weight:600;
  }
`;

const InputContainer = styled.div`
    width: 100%;
    margin:3px 0px;
`;


const CREATE_ACCOUNT_MUTATION = graphql(`
    mutation createAccount(
    $firstName: String!, 
    $lastName:String,
    $userName: String!,
    $email: String!,
    $password: String!){
        createAccount(firstName: $firstName,
        lastName: $lastName,
        userName: $userName,
        email: $email,
        password: $password){
            ok
            error
      }
    }
`);



function SignUp() {
    const navgate = useNavigate();

    const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{
        onCompleted(data) {
            const createAccount = data.createAccount;
            if(!createAccount?.ok){
                return;
            }
    
            const {userName}= getValues();
            // Success create account
            navgate(routes.home,{ state :{message:"Account created. Please login...", userName} as IAuthState } );
        },
    });



    /**
     * React Hoo Form
     */
    const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm<IForm>({
        mode: "onChange"
    });
    const onValid:SubmitHandler<IForm> = (data) => {
        if (loading) {
            return;
        }

        createAccount({
            variables:{
                ...data
            }
        })
    }


    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <InstagramLogo />
                    <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
                    <FacebookLoginButton>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLoginButton>
                </HeaderContainer>
                <Separator />
                <FormContainer>
                    <form onSubmit={handleSubmit(onValid)}>
                        <InputContainer>
                            <Input {...register("firstName", { required: "First Name is required." })}
                                type="text"
                                placeholder="First Name" />
                            <FormError message={errors?.firstName?.message} />
                        </InputContainer>
                        <InputContainer>
                            <Input {...register("lastName", { required: "Last Name is required." })}
                                type="text"
                                placeholder="Last Name" />
                            <FormError message={errors?.lastName?.message} />
                        </InputContainer>
                        <InputContainer>
                            <Input {...register("userName", { required: "Username is required." })}
                                type="text" placeholder="UserName" />
                            <FormError message={errors?.userName?.message} />
                        </InputContainer>
                        <InputContainer>
                            <Input {...register("email", { required: "Email is required." })}
                                type="text" placeholder="Email" />
                            <FormError message={errors?.email?.message} />
                        </InputContainer>
                        <InputContainer>
                            <Input {...register("password",
                                {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 4,
                                        message: "Password should be logger than 4 words.",
                                    }
                                })}
                                type="password" placeholder="Password" />
                            <FormError message={errors?.password?.message} />
                        </InputContainer>
                        <InputContainer>
                            <Button type="submit" disabled={!isValid}>
                                {loading ? "Loading..." : "Sign up"}
                            </Button>
                        </InputContainer>
                        <LearnMore>
                            People who use our service may have uploaded your contact information to Instagram.
                            <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank" rel="noopener noreferrer">Learn More</a>
                        </LearnMore>
                    </form>
                </FormContainer>
            </FormBox>
            <BottomBox cta="Have an account? " link={routes.home} linkText="Log in" />
        </AuthLayout>
    )
}

export default SignUp;