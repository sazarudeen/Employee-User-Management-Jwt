import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showSuccessToast = (message, delay) => {
    toast.success(message, {
        position: 'top-center',
        autoClose: delay,
        closeButton: true,
        style: {
            width: "800px",
            position: "absolute",
            right: "-86%",
            marginTop: "17%",
            color:"green",
            fontWeight:'bold'
        }
    });
}

const showErrorToast = (message, delay) => {
    toast.error(message, {
        position: 'top-center',
        autoClose: delay,
        closeButton: true,
        style: {
            width: "800px",
            position: "absolute",
            right: "-86%",
            marginTop: "17%",
            color:"red",
            fontWeight:'bold'
        }
    });
}

const showWarnToast = (message, delay) => {
    toast.warn(message, {
        position: 'top-center',
        autoClose: delay,
        closeButton: true,
        style: {
            width: "800px",
            position: "absolute",
            right: "-86%",
            marginTop: "17%",
            color:"black",
            fontWeight:'bold'
        }
    });
}

const showInfoToast = (message, delay) => {
    toast.info(message, {
        position: 'top-center',
        autoClose: delay,
        closeButton: true,
        style: {
            width: "800px",
            position: "absolute",
            right: "-86%",
            marginTop: "17%",
            color:"blue",
            fontWeight:'bold'
        }
    });
}


export const toastFunctions = {
    showInfoToast,
    showErrorToast,
    showSuccessToast,
    showWarnToast
};

