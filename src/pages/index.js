import Redirect from 'umi/redirect';
export default function BeginRouter(props) {
    const sid = window.localStorage.getItem('sid')
    console.log(sid);
    return (
        <>
            {sid ?
                <Redirect to="/home" />
                :

                <Redirect to="/login" />
            }
        </>
    )
}
