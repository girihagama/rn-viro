export function setStep(step_number, stepData) {
    return {
        type: 'setStep',
        payload: { active_step: step_number, active_step_data : stepData }
    }
}