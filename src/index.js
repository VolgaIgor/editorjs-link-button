import './index.css';

import toolboxIcon from './svg/toolbox.svg';
import linkIcon from './svg/link.svg';

export default class LinkButton {

    static get toolbox() {
        return {
            title: 'Link Button',
            icon: toolboxIcon
        };
    }

    /**
     * Available colors
     *
     * @returns {{name: string, icon: string, title: string}[]}
     */
    static get tunes() {
        return [
            {
                name: 'green',
                icon: '<div class="cdx-lbtn_tune-color" style="background-color:#2E7D32;"></div>',
                title: 'Green',
            },
            {
                name: 'blue',
                icon: '<div class="cdx-lbtn_tune-color" style="background-color:#0d6efd;"></div>',
                title: 'Blue',
            },
            {
                name: 'red',
                icon: '<div class="cdx-lbtn_tune-color" style="background-color:#E44844;"></div>',
                title: 'Red',
            },
        ];
    }

    /**
     * CSS classes
     *
     * @returns {object}
     */
    get CSS() {
        return {
            linkInput: 'cdx-lbtn_l-input',
            captionInput: 'cdx-lbtn_c-input',
            blockWrapper: 'cdx-lbtn_wrapper',
            tuneWrapper: 'cdx-lbtn_tune-wrapper',
            tuneButton: 'cdx-lbtn_tune-btn'
        };
    };

    /**
     * Constructor
     *
     * @param api - Editor.js API
     * @param data - previously saved data
     */
    constructor({ api, data, config }) {
        this.api = api;
        this.config = config || {};
        this.data = {
            url: data.url || '',
            caption: data.caption || ''
        };

        this.color = data.color || '';

        this.nodes = {
            linkInput: null,
            captionInput: null,
            tuneButtons: []
        };
    }

    get color() {
        return this.data.color;
    }

    /**
     * Set button color
     * @param {string} color
     */
    set color(color) {
        let tuneData = LinkButton.tunes.find(tune => tune.name === color);
        if (!tuneData) {
            this.data.color = LinkButton.tunes[0].name;
        } else {
            this.data.color = color;
        }
    }

    /**
     * Rendering inputs
     * @returns {HTMLDivElement}
     */
    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add(this.api.styles.block, this.CSS.blockWrapper);

        const linkInput = document.createElement('input');
        linkInput.placeholder = this.api.i18n.t('Enter a link');
        linkInput.classList.add(this.api.styles.input, this.CSS.linkInput);
        linkInput.value = this.data.url;

        const captionInput = document.createElement('input');
        captionInput.placeholder = this.api.i18n.t('Enter a caption');
        captionInput.classList.add(this.api.styles.input, this.CSS.captionInput);
        captionInput.value = this.data.caption;

        const svgWrapper = document.createElement('div');
        svgWrapper.innerHTML = linkIcon;

        const inputWrapper = document.createElement('div');
        inputWrapper.style.width = '100%';
        inputWrapper.appendChild(linkInput);
        inputWrapper.appendChild(captionInput);

        wrapper.appendChild(svgWrapper);
        wrapper.appendChild(inputWrapper);

        this.nodes.linkInput = linkInput;
        this.nodes.captionInput = captionInput;

        return wrapper;
    }

    renderSettings() {
        const tunes = this.config.colors ?? LinkButton.tunes ?? [];
        if (tunes.length === 0) {
            return wrapper;
        }

        const wrapper = document.createElement('div');
        wrapper.classList.add(this.CSS.tuneWrapper);

        tunes.forEach(tune => {
            let button = document.createElement('div');

            button.classList.add(this.api.styles.settingsButton, this.CSS.tuneButton);
            button.classList.toggle(this.api.styles.settingsButtonActive, this.data.color === tune.name);
            button.innerHTML = tune.icon;
            button.dataset.tune = tune.name;

            wrapper.appendChild(button);

            button.addEventListener('click', () => {
                this._toggleTune(tune.name);
            });
            this.nodes.tuneButtons.push(button);

            this.api.tooltip.onHover(button, tune.title, {
                placement: 'top',
            });
        });

        return wrapper;
    }

    _toggleTune(tuneName) {
        this.color = tuneName;
        this.nodes.tuneButtons.forEach(button => {
            button.classList.toggle(this.api.styles.settingsButtonActive, this.data.color === button.dataset.tune);
        });
    }

    /**
     * Save
     * @returns {{anchor: string} | undefined}
     */
    save() {
        this.data.url = this.nodes.linkInput?.value;
        this.data.caption = this.nodes.captionInput?.value;

        return this.data;
    }
}