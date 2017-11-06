import React from 'react';
import Styles from './styles.scss';

export const ReposList = ({ repos, changePage, ...rest }) => repos.map((repo, key) => {
    const { name, description, language } = repo;

    return (
        <div key = { key } { ...rest }>
            <a className = { Styles.repoTitle } onClick = { () => changePage('Repo', repo) }>{ name }</a>
            <p className = { Styles.repoDesc }>{ description }</p>
            <p className = { language ? Styles.repoLang : null }>{ language }</p>
        </div>
    )
});
