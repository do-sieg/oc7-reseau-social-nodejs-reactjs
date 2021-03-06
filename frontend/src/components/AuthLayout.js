import Header from "./Header";

// Layout du site (authentifi√©)
export default function AuthLayout({ children }) {
    return (
        <div className="container">
            <Header isAuthenticated={true} />
            <div className="inner-container">
                {children}
            </div>
        </div>
    );
}