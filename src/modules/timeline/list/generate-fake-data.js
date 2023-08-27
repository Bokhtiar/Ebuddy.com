import React from "react";
// import faker from "faker";
import moment from "moment";

export default function (groupCount = 5, itemCount = 15, daysInPast = 15) {
    let randomSeed = Math.floor(Math.random() * 1000);
    let groups = [];
    for (let i = 0; i < groupCount; i++) {
        groups.push({
            id: `${i + 1}`,
            title: 'Ariful Islam',
            rightTitle: 'rIGHT TITLE',
            // bgColor: randomColor({ luminosity: "light", seed: randomSeed + i })
        });
    }

    let items = [];
    for (let i = 0; i < itemCount; i++) {
        const startDate =
            // faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000;
            moment().add(2, 'hour').valueOf() + daysInPast * 0.3 * 86400 * 1000;
        const startValue =
            startDate + Math.random() * 2 * 86400 * 1000;
        const endValue = moment(
            startDate + Math.random() * 2 * 86400 * 1000
        ).valueOf();

        items.push({
            id: i + "",
            group: `${Math.floor(Math.random() * groupCount) + 1}`,
            title: 'Meeting 1',
            start: startValue,
            end: endValue,
            // canMove: startValue > new Date().getTime(),
            // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
            className:
                moment(startDate).day() === 6 || moment(startDate).day() === 0
                    ? "item-weekend"
                    : "",
            itemProps: {
                "data-tip": "Hello world",
            }
        });
    }

    items = items.sort((a, b) => b - a);

    return { groups, items };
}
