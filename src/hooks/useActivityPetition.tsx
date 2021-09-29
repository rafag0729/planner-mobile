import { useState } from "react"


export const useActivityPetition = () => {

    const [isEditing, setIsEditing] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [petitionCompleted, setPetitionCompleted] = useState(false);

    const createActivity = () => {
        console.log('Petition delete')
    }

    const updateActivity = () => {
        console.log('Petition update')
    }

    const deleteActivity = () => {
        console.log('Petition delete')
    }

    return {
        isEditing,
        isLoading,
        createActivity,
        updateActivity,
        deleteActivity,
        petitionCompleted
    }

}
