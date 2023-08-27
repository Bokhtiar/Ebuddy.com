import moment from "moment";

export const doneMilestone = (milestone = []) => {
    let total = 0;

    milestone.forEach(mile => {
        if (mile?.milestone_status?.name === "DONE") total +=1;
    });
    
    return total;
}

export const wipMilestone = (milestone = []) => {
    let total = 0;

    milestone.forEach(mile => {
        if (mile?.milestone_status?.name === "WIP") total += 1;
    });
    
    return total;
}

export const holdMilestone = (milestone = []) => {
    let total = 0;

    milestone.forEach(mile => {
        if (mile?.milestone_status?.name === "HOLD") total += 1;
    });
    
    return total;
}

export const declinedMilestone = (milestone = []) => {
    let total = 0;

    milestone.forEach(mile => {
        if (mile?.milestone_status?.name === "DECLINED") total += 1;
    });
    
    return total;
}

export const getProgress = (milestones = []) => {
    let progress = 0;

    milestones.forEach(mile => {
        progress = progress + mile.progress;
    })

    return toDecimal(progress / milestones.length);
}

export const toDecimal = ( price, fixedCount = 2 ) => {
    if (price) return price.toLocaleString( undefined, { minimumFractionDigits: fixedCount, maximumFractionDigits: fixedCount } );
}

export const YTSMilestone = (milestone = []) => {
    let total = 0;

    milestone.forEach(mile => {
        if (!mile.milestone_status_id) total += 1;
    });
    
    return total;
}

export const getDuePayment = (project) => {
    let payment = 0;

    if (project && project.milestones && project.milestones.length) {
        project.milestones.forEach(mile => {
            payment = (payment + (mile.payment || 0));
        });
    }
    return Math.abs((project?.value || 0) - payment);
}

export const reviewedCount = (milestones = [], type) => {
    let total = 0;

    milestones.forEach(mile => {
        if (mile?.milestone_review?.name === type) total += 1;
    });

    return total
}

export const next6_10_days = (milestones = []) => {
    let total = 0;

    let startDate = moment().add(5, "days"),
        endDate = moment().add(10, "days");

    milestones.forEach(mile => {
        if (mile?.plan_end_date) {
            let compareDate = moment(mile.plan_end_date, "YYYY-MM-DD");
            if (compareDate.isBetween(startDate, endDate)) total += 1;
        }
    });

    return total;
}

export const next1_5_days = (milestones = []) => {
    let total = 0;

    let startDate = moment(),
        endDate = moment().add(5, "days");

    milestones.forEach(mile => {
        if (mile?.plan_end_date) {
            let compareDate = moment(mile.plan_end_date, "YYYY-MM-DD");
            if (compareDate.isBetween(startDate, endDate)) total += 1;
        }
    });

    return total;
}

export const DateOver = (milestones = []) => {
    let total = 0;
    
    milestones.forEach(mile => {
        if (mile?.plan_end_date) {
            let compareDate = moment(mile.plan_end_date, "YYYY-MM-DD");
            if (compareDate.isBefore(moment()) && mile?.milestone_status_id !== 4) total += 1; // milestone_status_id: 4 = DONE
        }
    });

    return total;
}

export const billesTotal = (milestones = []) => {
    let payment = 0;
    
    if (milestones && milestones.length) {
        milestones.forEach(mile => {
            payment = (payment + (mile.payment || 0));
        });
    }

    return payment;
}

export const reviewedMilestoneBilltotal = (milestones = []) => {
    let payment = 0;
    
    if (milestones && milestones.length) {
        milestones.forEach(mile => {
            if (mile.review_status_id) {
                payment = (payment + (mile.payment || 0));
            }
        });
    }

    return payment;
}

export const getExpectedProgress = (milestones = []) => {
    // Project Expected Progress:
    // Project Total Milestone: 20
    // Till Today Number of Milestone Should be Copmpleted: 10 (As per Plan End Date)
    // Project Progress: 10/20*100 = 50%

    let totalMilestone = milestones.length || 0,
        dateOver = DateOver(milestones);

    return (dateOver / totalMilestone *100);
}

export const getActualProgress = (milestones = []) => {
    // Project Actual Progress:
    // Project TOtal Mislestone: 20
    // Till Today Number of Milestone Completed (Reviewed): 5 (As per Actual End Date)
    // Project Progress: 5/20*100 = 25%

    let totalMilestone = milestones.length || 0,
        completedMilestone = milestones.filter(mil => mil.review_status_id).length;

    return (completedMilestone / totalMilestone * 100)
}

export const getPaymentExpectedProgress = (project) => {
    // Project Payment Expected Progress:
    // Project Value: 100
    // Sum of Amount Where Milestone Amount Input: 75
    // Payment Progress: 75/100*100 = 75%

    let value = project.value || 0,
        totalMilestoneAmount = billesTotal(project.milestones);

    return (totalMilestoneAmount / value * 100);
}

export const getPaymentActualProgress = (project) => {
    // Project Payment Actual Progress:
    // Project Value: 100
    // Sum of Amount Where Milestone Amount Input and Milestone Is Reviewed Stage: 25
    // Payment Progress: 25/100*100 = 25%

    let value = project.value || 0,
        totalMilestoneAmount = reviewedMilestoneBilltotal(project.milestones);

    return (totalMilestoneAmount / value * 100);
}