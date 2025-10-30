import styles from "./people-details.module.css";
import { usePeopleDetails } from "../../shared/hooks/usePeopleDetails/usePeopleDetails.ts";
import { useNavigate, useParams } from "react-router-dom";

const getGenderString = (genderId: number): string => {
    switch (genderId) {
        case 1: return "Female";
        case 2: return "Male";
        case 3: return "Non-binary";
        default: return "Not specified";
    }
};

const PeopleDetails = () => {
    const navigate = useNavigate();
    const { id: rawId } = useParams<{ id: string }>();
    const id = Number(rawId);

    const { data: peopleDetails, isLoading, error } = usePeopleDetails(id);

    if (isLoading) {
        return <div className={styles.centered}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.centeredError}>Error: {error.message}</div>;
    }

    if (!peopleDetails) {
        return <div className={styles.centered}>Person not found.</div>;
    }

    const {
        name,
        profile_path,
        biography,
        birthday,
        deathday,
        place_of_birth,
        known_for_department,
        also_known_as,
        gender,
        homepage,
        imdb_id,
        popularity
    } = peopleDetails;

    const imageUrl = profile_path
        ? `https://image.tmdb.org/t/p/w500${profile_path}`
        : null;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                &larr; Go Back
            </button>

            <div className={styles.detailsGrid}>
                <div className={styles.imageContainer}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={name} className={styles.profileImage} />
                    ) : (
                        <div className={styles.placeholderImage}>No Image Available</div>
                    )}
                </div>

                <div className={styles.infoContainer}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.knownFor}>Known for: <strong>{known_for_department || "N/A"}</strong></p>

                    {biography && (
                        <div className={styles.section}>
                            <h2>Biography</h2>
                            <p className={styles.biography}>{biography}</p>
                        </div>
                    )}

                    <div className={styles.section}>
                        <h2>Personal Info</h2>
                        <div className={styles.personalInfoGrid}>
                            <InfoItem label="Gender" value={getGenderString(gender)} />
                            <InfoItem label="Born" value={birthday} />
                            {deathday && <InfoItem label="Died" value={deathday} />}
                            <InfoItem label="Place of Birth" value={place_of_birth} />
                            <InfoItem label="Popularity" value={popularity?.toFixed(2)} />
                        </div>
                    </div>

                    {also_known_as && also_known_as.length > 0 && (
                        <div className={styles.section}>
                            <h2>Also Known As</h2>
                            <ul className={styles.aliasesList}>
                                {also_known_as.map((alias: any) => (
                                    <li key={alias}>{alias}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.links}>
                        {homepage && <a href={homepage} target="_blank" rel="noopener noreferrer">Website</a>}
                        {imdb_id && <a href={`https://www.imdb.com/name/${imdb_id}`} target="_blank" rel="noopener noreferrer">IMDb</a>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }: { label: string, value: string | number | undefined | null }) => {
    if (!value) return null;
    return (
        <div className={styles.infoItem}>
            <strong>{label}</strong>
            <span>{value}</span>
        </div>
    );
};

export default PeopleDetails;