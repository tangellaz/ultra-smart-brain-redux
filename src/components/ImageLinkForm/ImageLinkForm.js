import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({onInputChange, onButtonSubmit, onKeyPress}) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain will detect human faces in your pictures.'}
			</p>
			<p className='f3'>
				{'Just enter the URL to a JPG, PNG, or BMP image and hit '}
				<strong>{'Detect'}</strong>
				{'.'}
			</p>
			<p className='f3'>
				{'Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} onKeyDown={onKeyPress}/>
					<button
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}
						>Detect
					</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;