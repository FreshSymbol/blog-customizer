import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type OnClick = (state: string) => void;

type ArticleParamsFormProps = {
	setFontFamilyArticle: OnClick;
	setFontSizeArticle: OnClick;
	setFontColorArticle: OnClick;
	setContentWidthArticle: OnClick;
	setBackgroundColorArticle: OnClick;
};

export const ArticleParamsForm = ({
	setFontFamilyArticle,
	setFontSizeArticle,
	setFontColorArticle,
	setContentWidthArticle,
	setBackgroundColorArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [fontSize, setFontSize] = useState<OptionType>(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState<OptionType>(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		backgroundColors[0]
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);
	const rootRef = useRef<HTMLDivElement>(null);

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setFontFamilyArticle(fontFamily.value);
		setFontSizeArticle(fontSize.value);
		setFontColorArticle(fontColor.value);
		setBackgroundColorArticle(backgroundColor.value);
		setContentWidthArticle(contentWidth.value);
	}

	function handleReset() {
		setFontFamilyArticle(defaultArticleState.fontFamilyOption.value);
		setFontSizeArticle(defaultArticleState.fontSizeOption.value);
		setFontColorArticle(defaultArticleState.fontColor.value);
		setBackgroundColorArticle(defaultArticleState.contentWidth.value);
		setContentWidthArticle(defaultArticleState.backgroundColor.value);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.contentWidth);
		setContentWidth(defaultArticleState.backgroundColor);
	}

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, setIsOpen]);

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles['container_open']]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<fieldset className={styles.fieldSet}>
						<Select
							onChange={(selected) => setFontFamily(selected)}
							options={fontFamilyOptions}
							selected={fontFamily}
							title='Шрифт'
						/>
						<RadioGroup
							onChange={(selected) => setFontSize(selected)}
							options={fontSizeOptions}
							selected={fontSize}
							title='Размер шрифта'
							name='fontSize'
						/>
						<Select
							onChange={(selected) => setFontColor(selected)}
							options={fontColors}
							selected={fontColor}
							title='цвет шрифта'
						/>
					</fieldset>
					<Separator />
					<fieldset className={styles.fieldSet}>
						<Select
							onChange={(select) => setBackgroundColor(select)}
							options={backgroundColors}
							selected={backgroundColor}
							title='Цвет фона'
						/>
						<Select
							onChange={(select) => setContentWidth(select)}
							options={contentWidthArr}
							selected={contentWidth}
							title='Ширина контента'
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
