import { GetStaticPropsContext } from 'next';
import Timer from '@components/projects/workout-timer/Timer';
import styles from '@styles/WorkoutTimer.module.scss'
import { WorkoutWithID } from 'types/WorkoutTimer';

interface TimerProps {
    workout: WorkoutWithID
}

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:8080/api/workout')
    const data = await res.json()

    const { workouts } = data

    const paths = workouts.map((workout: WorkoutWithID) => {
        return {
            params: { id: workout._id }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/${context.params?.id}`)
    console.log(res)
    const data = await res.json()

    return {
        props: { workout: data }
    }
}

const timer = ({ workout }: TimerProps) => {
    return (
        <div className={styles.wortkoutTimer}>
            <Timer {...workout} />
        </div>
    );
};

export default timer;