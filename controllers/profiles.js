import { Profile } from '../models/profile.js'
import { Job } from '../models/job.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    console.log('show params', req.params)
    const profile = await Profile.findById(req.params.profileId)
    .populate('applications')
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createResume(req, res) {
  try {
    console.log('create resume params', req.params)
    const profile = await Profile.findById(req.params.profileId)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createBrandStatement(req, res) {
  try {
    console.log('new brand')
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { 
  index, 
  addPhoto, 
  show,
  createResume,
  createBrandStatement,
}
