// import TextEditor from '../../components/TextEditor';
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from 'next/dist/client/router';
import { db } from '../../firebase';
import {useDocumentOnce} from 'react-firebase-hooks/firestore';
import { useSession, getSession, signOut } from "next-auth/client"
import Login from '../../components/Login';
import TextEditor from "../../components/TextEditor";

function Doc() {

    const [session] = useSession();
    if(!session) return <Login />;

    const router = useRouter();
    const { id } = router.query;

    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.collection("userDocs").doc(session.user.email).collection
        ("docs").doc(id)
    );

    if(!loadingSnapshot && !snapshot?.data()?.fileName) {
        router.replace('/');
    };

    
    
  return (
    <div>
        <header className="flex justify-between items-center p-3 pb-1">
            <span onClick={()=> router.push("/")} className="cursor-pointer">
                <Icon  name="description" size="5xl" color="blue" />
            </span>

            <div className="flex-grow px-2">
                <h2>{snapshot?.data()?.fileName}</h2>
                <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                    <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">File</p>
                    <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Edit</p>
                    <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">View</p>
                    <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Insert</p>
                    <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Format</p>
                    <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">Tools</p>
                </div>
            </div>


            <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                className="hidden md:!inline-flex h-10"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="dark"
            >
                <Icon name="people" size="md" />
                Share
            </Button>

            <img className="cursor-pointer rounded-full h-10 w-10 ml-2" src={session.user.image} alt="" />
        </header>

        <TextEditor />
    </div>
  )
}

export default Doc

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}