import * as _React from 'react';
import { useState } from 'react'; 
import {  useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from 'firebase/auth'; 
import { SubmitHandler, useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 
import {
    Box,
    Button,
    Typography,
    Snackbar,
    Stack,
    Divider,
    CircularProgress, 
    Dialog,
    DialogContent,
    Alert } from '@mui/material' 


    import { NavBar, InputText, InputPassword } from '../sharedComponents'
    import wizards from '../../assets/Images/houses.jpg';

    const authStyles = {
        main: {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${wizards});`,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top 5px', 
            position: 'absolute',
            marginTop: '10px'
        },
        stack: {
            width: '400px',
            marginTop: '100px',
            marginRight: 'auto', 
            marginLeft: 'auto',
            color: 'white'
        },
        button: {
            width: '175px',
            fontSize: '14px'
        }
    }
    
    
    
    interface Props {
        title: string
    }
    
    
    interface ButtonProps {
        open: boolean 
        onClick: () => void
    }
    
    
    interface SubmitProps {
        email: string
        password: string 
    }

export type MessageType = 'error' | 'warning' | 'info' | 'success'

const GoogleButton = (_props: ButtonProps ) => {
    const [ open, setOpen ] = useState(false) 
    const [ message, setMessage ] = useState<string>() 
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate() 
    const auth = getAuth() 
    const  [ signInWithGoogle, _user, loading, error ] = useSignInWithGoogle(auth)


    const signIn = async () => {
        await signInWithGoogle() 

        
        localStorage.setItem('auth', 'true') 
        onAuthStateChanged(auth, (user) => {

            if (user) {
                localStorage.setItem('user', user.email || "") 
                localStorage.setItem('uuid', user.uid || "")
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                
                setTimeout(() => {navigate('/shop')}, 2000) 
            }
        })

        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }

        if (loading) {
            return <CircularProgress />
        }

    }

    return (
        <Box>
            <Button
                variant = 'contained'
                color = 'info'
                size = 'large'
                sx = { authStyles.button }
                onClick = { signIn }
            >
                Sign In With Google
            </Button>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}

const SignIn = () => {
    const [ open, setOpen ] = useState(false) 
    const [ message, setMessage ] = useState<string>() 
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate() 
    const auth = getAuth() 
    const { register, handleSubmit } = useForm<SubmitProps>({})


    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 


        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((_userCredential) => {
            localStorage.setItem('auth', 'true') 
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    localStorage.setItem('user', user.email || "") 
                    localStorage.setItem('uuid', user.uid || "") 
                    setMessage(`Successfully logged in ${user.email}`)
                    setMessageType('success')
                    setOpen(true)
                    setTimeout(() => {navigate('/shop')}, 2000) 
                }
            } )
        })
        .catch((error) => {
            const errorMessage = error.message 
            setMessage(errorMessage)
            setMessageType('error')
            setOpen(true)
        })

    }
    
    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Into Your Account</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters or longer' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}

const SignUp = () => {
    const [ open, setOpen ] = useState(false) 
    const [ message, setMessage ] = useState<string>() 
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate() 
    const auth = getAuth() 
    const { register, handleSubmit } = useForm<SubmitProps>({})


    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 


        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((_userCredential) => {
            
            localStorage.setItem('auth', 'true') 
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    localStorage.setItem('user', user.email || "") 
                    localStorage.setItem('uuid', user.uid || "") 
                    setMessage(`Successfully logged in ${user.email}`)
                    setMessageType('success')
                    setOpen(true)
                    
                    setTimeout(() => {navigate('/shop')}, 2000) 
                }
            } )
        })
        .catch((error) => {
            const errorMessage = error.message 
            setMessage(errorMessage)
            setMessageType('error')
            setOpen(true)
        })

    }
    
    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Up for Free!</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters or longer' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}

export const Auth = (props:Props) => {
    const [open, setOpen] = useState(false)
    const [ signType, setSignType ] = useState<string>()


    
    return (
        <Box>
            <NavBar />
            <Box sx={ authStyles.main}>
                <Stack direction = 'column' alignItems = 'center' textAlign = 'center' sx={authStyles.stack}>
                    <Typography variant='h2' sx={{color: 'white'}}>
                        {props.title}
                    </Typography>
                    <br />
                    <Typography variant='h5'>
                        Track your Spells!
                    </Typography>
                    <br />
                    <GoogleButton open={open} onClick={() => setOpen(false)} />
                    <Divider variant = 'fullWidth' color = 'white' />
                    <br />
                    <Stack 
                        width = '100%'
                        alignItems = 'center'
                        justifyContent = 'space-between'
                        direction = 'row'
                    >
                        <Button 
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = { authStyles.button}
                            onClick = { () => { setOpen(true); setSignType('signin')}}
                        >
                            Email Login
                        </Button>
                        <Button 
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = { authStyles.button}
                            onClick = { () => { setOpen(true); setSignType('signup')}}
                        >
                            Email Signup
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose = {() => setOpen(false)}>
                    <DialogContent>
                        { signType === 'signin' ? <SignIn /> : <SignUp />}
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )

}