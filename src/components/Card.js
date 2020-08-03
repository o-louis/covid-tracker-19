import React from 'react';
import styles from './style.module.css';

function Card({ values, infected }) {

    const title = Object.keys(values)[0];
    const total = values[title];
    const classname = styles[title] || null;
    const percentageRate = Math.floor((total * 100) / infected);

    const totalClassName = concatClass(styles.total, classname);
    const percentageClassName = concatClass(styles.percentage, classname);

    const text = {
        recovered: "recovery",
        deaths: "fatality"
    };

    const percentageText = `${percentageRate}% ${text[title]} rate`;

    return (
        <div className={styles.cards}>
            <h4 className={styles.title}>{title}</h4>
            <span className={totalClassName}>
                {total.toLocaleString()}
            </span>

            { classname &&
                <span className={percentageClassName}>
                    {percentageText}
                </span>
            }
        </div>
    )
}

const concatClass = (class1, class2) => `${class1} ${class2}`;

export default Card;
