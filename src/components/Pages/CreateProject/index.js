import React, { Component } from 'react';
import Styles from './styles.scss';
import { REPO_OWNER } from '../../../constants';
import book from '../../../theme/assets/repo.png';

export class CreateProject extends Component {

    render () {

        return (
            <div className = { Styles.projectForm } >
                <form>
                    <div className = { Styles.formRow }>
                        <h1>Create a new repository</h1>
                        <p>A repository contains all the files for your project, including the revision history.</p>
                    </div>
                    <div className = { Styles.repositoryPath }>
                        <div className = 'form-group'>
                            <label htmlFor = 'exampleInputEmail1'>Owner</label>
                            <input disabled className = 'form-control' id = 'exampleInputEmail1' type = 'text' value = { REPO_OWNER } />
                            <span> / </span>
                        </div>
                        <div className = 'form-group'>
                            <label htmlFor = 'exampleInputPassword1'>Repository name</label>
                            <input className = 'form-control' id = 'exampleInputPassword1' placeholder = 'Password' type = 'password' />
                        </div>
                    </div>
                    <p>Great repository names are short and memorable. Need inspiration? How about
                        cautious-umbrella.</p>
                    <div className = { Styles.description + ' form-group' }>
                        <label htmlFor = 'exampleInputPassword1'>Description (optional)</label>
                        <input type = 'text' className = 'form-control' id = 'exampleInputPassword1' />
                    </div>
                    <div className = { Styles.repoTypeRow }>
                        <div className = 'radio'>
                            <label>
                                <input checked id = 'optionsRadios1' name = 'optionsRadios' type = 'radio' value = 'option1' />
                                <p><img className = { Styles.publicImg } src = { book } />Public</p>
                                <p>Option one is this and that&mdash;be sure to include why it's great</p>
                            </label>
                        </div>
                    </div>
                    <div className = { Styles.readmeInitRow }>
                        <div className = 'checkbox'>
                            <label className = 'checkbox-inline'>
                                <input id = 'inlineCheckbox1' type = 'checkbox' value = 'option1' />
                                Initialize this repository with a README
                                <p>This will let you immediately clone the repository to your computer. Skip this step
                                    if you’re importing an existing repository.</p>
                            </label>
                        </div>
                        <div className = { Styles.footerDropDowns }>
                            <div className = 'btn-group'>
                                <button aria-expanded = 'false' aria-haspopup = 'true' className = 'btn btn-default btn-sm dropdown-toggle' data-toggle = 'dropdown' type = 'button'>
                                    Add .gitignore: <span className = { Styles.gitignoreOption }>None</span>
                                    <span className = 'caret' />
                                </button>
                                <ul className = 'dropdown-menu'>
                                    <li><a href = '#'>Sass</a></li>
                                    <li><a href = '#'>VisualStudio</a></li>
                                    <li><a href = '#'>WordPress</a></li>
                                    <li><a href = '#'>Yeoman</a></li>
                                </ul>
                            </div>
                            <span>|</span>
                            <div className = 'btn-group'>
                                <button className = 'btn btn-default btn-sm dropdown-toggle' type = 'button'
                                        data-toggle = 'dropdown' aria-haspopup = 'true' aria-expanded = 'false'>
                                    Add a license: <span className = { Styles.gitignoreOption }>None</span>
                                    <span className = 'caret' />
                                </button>
                                <ul className = 'dropdown-menu'>
                                    <li><a href = '#'>Apache License 2.0</a></li>
                                    <li><a href = '#'>GNU General Public License v3.0</a></li>
                                    <li><a href = '#'>MIT License</a></li>
                                </ul>
                            </div>
                            <i aria-hidden = 'true' className = 'fa fa-info-circle' />
                        </div>
                    </div>
                    <button className = 'btn btn-success' type = 'submit' >Create repository</button>

                </form>
            </div>
        )
    }

}

