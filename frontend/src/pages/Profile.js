import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { appFetch } from "../utils/fetch";

export default function Profile() {
    const history = useHistory();

    const [load, setLoad] = useState(true);

    const [fieldFirstName, setFieldFirstName] = useState("");
    const [fieldLastName, setFieldLastName] = useState("");
    const [fieldImagePath, setFieldImagePath] = useState("");

    // Validation Errors
    const [errFirstName, setErrFirstName] = useState("");
    const [errLastName, setErrLastName] = useState("");
    const [errImagePath, setErrImagePath] = useState("");

    useEffect(async () => {
        async function loadProfile() {

            const result = await appFetch('get', '/users/profile');

            if (result.status !== 200) {
                alert(result.message);
                history.replace("/");
                return;
            }

            if (result.data) {
                setFieldFirstName(result.data.firstName);
                setFieldLastName(result.data.lastName);
                setFieldImagePath(result.data.imagePath);
            } else {
                // ERREUR
            }
            setLoad(false);
        }
        loadProfile();
    }, []);


    function handleChangeFirstName(e) {
        e.preventDefault();
        setFieldFirstName(e.target.value);
    }

    function handleChangeLastName(e) {
        e.preventDefault();
        setFieldLastName(e.target.value);
    }

    function canSubmit() {
        setErrFirstName("");
        setErrLastName("");
        
        if (fieldFirstName === "") {
            setErrFirstName("Veuillez renseigner ce champ");
            return false;
        }
        if (fieldLastName === "") {
            setErrLastName("Veuillez renseigner ce champ");
            return false;
        }

        // IMAGE PATH

        return true;
    }
    
    async function handleSubmit(e) {
        e.preventDefault();

        if (window.confirm("Modifier les informations de profil ?")) {

            if (!canSubmit()) {
                return;
            }
    
            const body = { firstName: fieldFirstName, lastName: fieldLastName };
    
            setLoad(true);
            const result = await appFetch('post', '/users/profile', body);
            setLoad(false);
            alert(result.message);
        }

        
    }

    return (
        <div>
            {load ?
                <p>LOADING...</p>
                :
                <div>
                    <h1>Profil</h1>

                    <label>Prénom</label>
                    <input value={fieldFirstName} onChange={handleChangeFirstName} required />
                    {errFirstName !== "" && <p>{errFirstName}</p>}

                    <label>Nom</label>
                    <input value={fieldLastName} onChange={handleChangeLastName} required />
                    {errLastName !== "" && <p>{errLastName}</p>}

                    {/* {fieldImagePath} */}

                    <button onClick={handleSubmit}>Modifier les changements</button>

                </div>
            }
        </div>
    );
}