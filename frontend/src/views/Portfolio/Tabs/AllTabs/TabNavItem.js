export default function TabNavItem({ id, title, activeTab, setActiveTab }) {
 
    const handleClick = () => {
    setActiveTab(id);
    };
 
    return (
    <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
        { title }
    </li>
    );
};