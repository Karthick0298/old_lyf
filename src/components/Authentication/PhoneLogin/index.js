import React, {useState, useEffect} from 'react'
import {makeStyles, IconButton, Box, Typography, Button, TextField, DialogActions, MenuItem, Paper, Popper, InputAdornment} from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Image from 'next/image'
import Link from 'next/link'
import DialogContent from '@material-ui/core/DialogContent'
import data from '../../../model/LoginFields/Phone/data'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAuth from '../../../../lib/Utils/hooks/UseAuth'
import AuthButton from '../../AuthButton'
import countryCodeApi from '../../../../Service/Login'
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useContextApi from '../../../../lib/Utils/hooks/useContextApi'
import secureLocalStorage from 'react-secure-storage'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiBackdrop-root': {
			background: '#0000004D 0% 0% no-repeat padding-box',
			backdropFilter: 'blur(9px)',
		},
		'& .MuiDialog-paperScrollPaper': {
			// maxHeight: 'calc(100% - 164px)',
			maxHeight: '94vh',
		},
		'& .MuiDialog-paperWidthSm': {
			// maxWidth: '54%',
			// minWidth: '32%',
			background: 'transparent linear-gradient(141deg, #fffffff0 0%, #ffffffc9 100%) 0% 0% no-repeat padding-box',
			borderRadius: 24,
		},
		'& .MuiDialogTitle-root': {
			padding: '24px 24px 0px 24px',
		},
		'& .MuiTypography-h6': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			'& .MuiTypography-h5': {
				color: theme.palette.lyfngo.main,
				textTransform: 'capitalize',
			},
		},
		'& .MuiDialogContent-root': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			paddingBlock: 36,
			'& .MuiTypography-body1': {
				fontFamily: theme.typography.h6.fontFamily,
				fontWeight: 500,
			},
		},
		'& .MuiDialogActions-root': {
			justifyContent: 'center',
			paddingBlockEnd: 64,
			paddingTop: 24,
		},
		'& .MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot, .MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot': {
			[theme.breakpoints.down('sm')]: {
				paddingRight: 0,
			},
		},
	},
	buttonList: {
		'& .MuiButton-root': {
			borderRadius: 24,
			border: '1px solid #DDDDDD',
			width: '100%',
		},
		'& .MuiButton-text': {
			padding: 0,
		},
		'& .MuiButton-label': {
			textTransform: 'capitalize',
			fontFamily: theme.typography.h6.fontFamily,
			fontSize: theme.typography.h6.fontSize,
			gap: 38,
		},
	},
	mediaList: {
		'& .MuiButton-root': {
			borderRadius: 24,
			border: '1px solid #DDDDDD',
			width: '100%',
		},
		'& .MuiIconButton-root': {
			position: 'relative',
			left: 16,
		},
		'& .MuiButton-text': {
			padding: 0,
			background: '#F1F1F1 0% 0% no-repeat padding-box',
		},
		'& .MuiButton-label': {
			textTransform: 'capitalize',
			fontFamily: theme.typography.h6.fontFamily,
			fontSize: theme.typography.h6.fontSize,
			gap: 38,
		},
	},
	link: {
		color: theme.palette.lyfngo.main,
		textDecoration: 'none',
	},
	footer: {
		paddingInline: 16,
		paddingBlock: 18,
		'& .MuiTypography-h6': {
			display: 'block',
			textAlign: 'center',
			color: '#999999',
		},
	},
	//   linkRoot: {
	//     borderBottom: '1px solid #ccc',
	//     "& .MuiListItem-button:hover": {
	//       backgroundColor: "unset",
	//     },
	//     "& .MuiListItem-gutters": {
	//       paddingInline: 28,
	//       paddingBlock: 10
	//     },
	//     [theme.breakpoints.down('xs')]:{
	//       "& MuiButtonBase-root":{
	//         padding: 12
	//       }
	//     }
	//   },
	content: {
		[theme.breakpoints.down('xs')]: {
			paddingInlineStart: 8,
			paddingInlineEnd: 0,
		},
		'& .MuiList-padding': {
			padding: 0,
			[theme.breakpoints.down('xs')]: {
				padding: 12,
				borderBottom: '1px solid #ccc',
			},
		},
	},
	loginLink: {
		fontFamily: theme.typography.h5.fontFamily,
		fontSize: theme.typography.h5.fontSize,
		textDecoration: 'none',
		color: '#464444',
		'&:hover': {
			color: theme.palette.lyfngo.main,
		},
	},
	mobileButton: {
		[theme.breakpoints.down('xs')]: {
			'& .MuiButton-text': {
				padding: '6px 18px',
			},
		},
	},
	emailInput: {
		paddingInline: 16,
		'& .MuiInputBase-input': {
			fontSize: 13,
			fontFamily: theme.typography.h6.fontFamily,
			fontWeight: 400,
		},
		'& .MuiFormLabel-root .Mui-focused': {
			color: 'red !important',
		},
		'& .MuiOutlinedInput-root .Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderBottom: 'red !important',
		},
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		'& .MuiTypography-h6': {
			paddingInline: 16,
			color: theme.palette.error.main,
			alignItems: 'baseline',
		},
	},
	numberField: {
		width: '100%',
		'& .MuiTypography-h6': {
			paddingInline: 16,
			color: theme.palette.lyfngo.main,
			alignItems: 'baseline',
		},
	},
	container: {
		display: 'flex',
		alignItems: 'flex-end',
		paddingInline: 16,
		'& .MuiInputBase-root': {
			fontSize: theme.typography.h5.fontSize,
			fontFamily: theme.typography.h5.fontFamily,
		},
	},
	opacityZero: {
		opacity: 0,
	},
	paper: {
		border: '1px solid #999999',
		boxShadow: '5px 5px 5px #999999',
	},
	popper: {
		zIndex: 99999,
		'& .MuiAutoComplete-option': {
			fontSize: 14,
			paddingLeft: 2,
			paddingRight: 2,
			paddingInline: 2,
		},
	},
	autoCompleteRoot: {
		'& .MuiInput-underline:after': {
			borderBottom: 'none',
		},
	},
	popperStyle: {
		zIndex: 99999,
		// minWidth: 120,
		'& .MuiAutocomplete-listbox': {
			background: '#fff',
		},
	},
}))

export default function PhoneLogin({
	handlePhoneOtp,
	open,
	handleClose,
	resetMobileField,
	setResetMobileField,
	handlePinLogin,
	handlePinValidateLogin,
}) {
	const {phonesignin, country, setCountry, countryCodeOptions, setCountryCodeOptions, setDefaultCountryCode} = useAuth()
	const {loading, setLoading} = useContextApi()
	const mobnolen = country?.mastLookupValue
	// const mobnum = mobnolen.map(item => item.mast_lookup_value)
	const isSetPin = typeof window !== 'undefined' ? secureLocalStorage.getItem('isSetPin') : null
	const isFromB2b = typeof window !== 'undefined' ? secureLocalStorage.getItem('isFromB2b') : null
	const schema = yup.object().shape({
		PhoneNumber: yup
			.string()
			.required('Please enter the mobile number')
			.nullable()
			.matches(/^([1-9][0-9]*)?$/, 'Please enter the valid mobile number')
			.min(mobnolen, `Must be exactly ${mobnolen} digit`)
			.max(mobnolen, `Must be exactly ${mobnolen} digit`),
	})
	const classes = useStyles()
	// const [resetMobileField, setResetMobileField] = useState('')
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = data => {
		phonesignin(data.PhoneNumber, (isFromB2b, isSetPin) => {
			secureLocalStorage.setItem('mobileNumber', data.PhoneNumber)
			reset()
			if (isSetPin && isFromB2b) {
				handlePinValidateLogin()
			} else if (isSetPin && !isFromB2b) {
				handlePinValidateLogin()
			} else if (!isSetPin && isFromB2b) {
				handlePinLogin()
			} else {
				handlePhoneOtp()
			}
		})
	}
	const getDialCodeDetails = () => {
		setLoading(true)
		const onSuccess = res => {
			setLoading(false)
			if (res?.data?.status === true) {
				const code = _.orderBy(res?.data?.data, 'mastLookupKey', 'desc')
				setCountryCodeOptions(code)
			} else {
			}
		}
		const onFailure = err => {
			console.log('error', err)
			setLoading(false)
		}
		countryCodeApi.CountryCodeGet().then(onSuccess, onFailure)
	}

	useEffect(() => {
		getDialCodeDetails()
	}, [])

	useEffect(() => {
		setDefaultCountryCode()
	}, [countryCodeOptions])
	let str = '+'
	// Designing Autocomplete Popper
	const CustomPopper = function(props) {
		const classes = useStyles()
		return <Popper {...props} className={classes.popperStyle} placement='bottom-start' />
	}

	return (
		<>
			<Dialog aria-labelledby='simple-dialog-title' style={{zIndex: 9999}} open={open} className={classes.root} onClose={handleClose}>
				<DialogTitle id='simple-dialog-title'>
					<IconButton disabled>
						<Image alt='lyfngo logo' src='https://ik.imagekit.io/lyfngo/web_b2c/public/images/staticPages/LYFnGOLogoB2b.png' width={64} height={62} />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Typography variant='body1'>Login/Signup</Typography>
				</DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={classes.container}>
						<Autocomplete
							loading={loading}
							loadingText='Loading..'
							ListboxProps={{
								style: {
									maxHeight: '12rem',
									fontSize: 11,
									fontFamily: ['"Poppins"', 'sans-serif'].join(','),
								},
							}}
							className={classes.autoCompleteRoot}
							options={countryCodeOptions}
							disableClearable
							name='countryCodeOptions'
							onChange={(e, value) => {
								setCountry(value)
								setResetMobileField('')
								reset()
							}}
							size='small'
							value={country}
							getOptionLabel={option => str.concat(option?.mastLookupKey)}
							classes={{popper: classes.popper}}
							// style={{width: 140}}
							PopperComponent={CustomPopper}
							renderOption={option => {
								return (
									<Box component='li' style={{display: 'flex', alignItems: 'center'}}>
										<div style={{display: 'flex', gap: 8}}>
											{/* <img width={20} height={15} src={`https://flagcdn.com/${option?.countryCode?.toLowerCase()}.svg`} alt='flag' />+ &nbsp;&nbsp; */}
											+{option?.mastLookupKey}
										</div>
									</Box>
								)
							}}
							renderInput={params => {
								return (
									<TextField
										{...params}
										size='small'
										InputProps={{
											...params.InputProps,
											// startAdornment: (
											// 	<InputAdornment position='start'>
											// 		{/* <img
											// 			loading='lazy'
											// 			width='20'
											// 			height={15}
											// 			src={`https://flagcdn.com/${country?.countryCode?.toLowerCase()}.svg`}
											// 			alt='flag'
											// 		/> */}
											// 	</InputAdornment>
											// ),
										}}
									/>
								)
							}}
						/>
						{data.inputs.map((item, index) => {
							return (
								<div className={classes.numberField} key={index}>
									<TextField
										size='small'
										fullWidth
										id='outlined-required'
										margin='dense'
										inputProps={errors.PhoneNumber ? {} : {maxLength: mobnolen}}
										className={classes.emailInput}
										placeholder={item.label}
										type={item.type}
										{...register(item.name)}
										error={!!errors.PhoneNumber}
										value={resetMobileField}
										onChange={(e, value) => {
											setResetMobileField(e?.target?.value)
										}}
									/>
								</div>
							)
						})}
					</div>
					{data.inputs.map((item, index) => {
						return (
							<div className={classes.wrapper} key={index}>
								{errors[item.name] ? (
									<Typography variant='h6' component='h6'>
										{errors[item.name]?.message}
									</Typography>
								) : (
									<Typography variant='h6' component='h6' className={classes.opacityZero}>
										{' helper text'}
									</Typography>
								)}
							</div>
						)
					})}
					<div className={classes.mediaList}>
						<div className={classes.footer}>
							<Typography variant='h6'>
								By signing in, I agree to the
								<Link href='/terms-and-conditions/'>
									<a target='_blank' className={classes.link}>
										&nbsp;Terms and Condition
									</a>
								</Link>
							</Typography>
						</div>
					</div>
					<DialogActions>
						<AuthButton type='submit'>Continue</AuthButton>
					</DialogActions>
				</form>
			</Dialog>
		</>
	)
}
