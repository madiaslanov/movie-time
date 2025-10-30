import styles from "./famous-people.module.css";
import { usePeople } from "../../../shared/hooks/usePeople/usePeople.ts";
import { IMAGE_BASE_URL } from "../../../shared/ui/image-url.ts";
import { TextCustom } from "../../../shared/ui/text-custom/text-custom.tsx";
import { useNavigate } from "react-router-dom";

interface PeopleState {
    name: string;
    id: number;
    profile_path: string;
    known_for_department: string;
}

const FamousPeople = () => {
    const { data: famousPeople, isLoading, error } = usePeople();
    const navigate = useNavigate();
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Произошла ошибка: {error.message}</div>;
    }

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                {famousPeople?.map((people: PeopleState) => (
                    <div
                        key={people.id}
                        className={styles.peopleCard}
                    >
                        {people.profile_path ? (
                            <img
                                src={IMAGE_BASE_URL + people.profile_path}
                                alt={people.name || "famous person"}
                                loading="lazy"
                                onClick={()=> navigate(`people/${people.id}`)}
                            />
                        ) : (
                            <div className={styles.noImage}>?</div>
                        )}

                        <div className={styles.infoBox}>
                            <TextCustom size="l" weight="bold">
                                {people.name}
                            </TextCustom>
                            <TextCustom size="m">
                                {people.known_for_department}
                            </TextCustom>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FamousPeople;