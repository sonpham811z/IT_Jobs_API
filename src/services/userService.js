/*eslint-disable*/
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import { jobModel } from '~/models/jobModel'
import { employerModel } from '~/models/employerModel'
import ApiError from '~/utils/ApiError'
import { cloudinaryProvider } from '~/providers/cloudinaryProvider'

const pickUserData = (user) => {
    if (!user) return null

    // Remove sensitive fields
    const { password, ...userData } = user
    return userData
}

const createNew = async (userDataFromAuth0) => {
  try {
    const filteredUser = filterAuth0User(userDataFromAuth0)

    const existingUser = await userModel.findOneByEmail(filteredUser.email)
    if (existingUser) {
      return pickUserData(existingUser)
    }

    const newUser = await userModel.createNew(filteredUser)
    const createdUser = await userModel.findOneById(newUser.insertedId)

    return pickUserData(createdUser)
  } catch (error) {
    throw error
  }
}

const getUserByEmail = async(email) => {
    try {
        const user = await userModel.findOneByEmail(email)
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
        }

        return pickUserData(user)
    } catch (error) {
        throw error
    }
}

const toggleSaveJob = async (userEmail, jobId) => {
    try {
        const updatedUser = await userModel.toggleSaveJob(userEmail, jobId)
        return updatedUser
    } catch (error) {
        throw error
    }
}

const followCompany = async (userEmail, employerId) => {
    try {
        const updatedUser = await userModel.followCompany(userEmail, employerId)
        return updatedUser
    } catch (error) {
        throw error
    }
}

const getSavedJobsDetail = async (email) => {
    const user = await userModel.findOneByEmail(email)
    if (!user)
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

    const savedJobs = await jobModel.findByIds(user.saveJob || [])

    // Gắn thông tin employer vào từng job
    const jobsWithEmployer = savedJobs.map(job => ({
        ...job
    }))

    return jobsWithEmployer
}


export const userService = {
    createNew,
    getUserByEmail,
    getUserById,
    updateProfile,
    toggleSaveJob,
    getSavedJobsDetail,
    followCompany
}
