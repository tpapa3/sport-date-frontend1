import HashLoader from "react-spinners/HashLoader";

const Loading: React.FC = () => {
    
    return (
        <div className='flex items-center justify-center h-screen'>
            <HashLoader
                color="#f5eceb"
                loading
                speedMultiplier={1}
            />
        </div>
        )

}

export default Loading;