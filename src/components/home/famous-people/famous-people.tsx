import styles from "./famous-people.module.css";
import { usePeople } from "../../../shared/hooks/usePeople/usePeople.ts";
import { IMAGE_BASE_URL } from "../../../shared/ui/image-url.ts";
import { TextCastom } from "../../../shared/ui/text-castom/text-castom.tsx";

interface PeopleState {
    name: string;
    id: number;
    profile_path: string;
    known_for_department: string;
}

const FamousPeople = () => {
    const { data: famousPeople, isLoading, error } = usePeople();

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
                            />
                        ) : (
                            <div className={styles.noImage}>?</div>
                        )}

                        <div className={styles.infoBox}>
                            <TextCastom size="l" weight="bold">
                                {people.name}
                            </TextCastom>
                            <TextCastom size="m">
                                {people.known_for_department}
                            </TextCastom>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FamousPeople;