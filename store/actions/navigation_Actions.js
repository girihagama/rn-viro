export function initSteps(stepData) {
    return {
        type: 'initSteps',
        payload: { active_step_data: stepData }
    }
}

export function setStep(step_number) {
    return {
        type: 'setStep',
        payload: { active_step: step_number }
    }
}