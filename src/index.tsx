import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamilyArticle, setFontFamilyArticle] = useState<string>(
		defaultArticleState.fontFamilyOption.value
	);
	const [fontSizeArticle, setFontSizeArticle] = useState<string>(
		defaultArticleState.fontSizeOption.value
	);
	const [fontColorArticle, setFontColorArticle] = useState<string>(
		defaultArticleState.fontColor.value
	);
	const [contentWidthArticle, setContentWidthArticle] = useState<string>(
		defaultArticleState.contentWidth.value
	);
	const [backgroundColorArticle, setBackgroundColorArticle] = useState<string>(
		defaultArticleState.backgroundColor.value
	);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamilyArticle,
					'--font-size': fontSizeArticle,
					'--font-color': fontColorArticle,
					'--container-width': contentWidthArticle,
					'--bg-color': backgroundColorArticle,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setFontFamilyArticle={setFontFamilyArticle}
				setFontSizeArticle={setFontSizeArticle}
				setFontColorArticle={setFontColorArticle}
				setContentWidthArticle={setContentWidthArticle}
				setBackgroundColorArticle={setBackgroundColorArticle}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
