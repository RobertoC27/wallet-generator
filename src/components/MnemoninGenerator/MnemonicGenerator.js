import React, { Component } from 'react';
import bip39 from 'bip39';
import hdKey from 'ethereumjs-wallet/hdkey';
import QRCode from 'qrcode';
import QRContainer from '../QRContainer/QrContainer';
import Swal from 'sweetalert2';

import './MnemonicGenerator.css'
import crypto from 'crypto';
import pubKeyImg from '../../theme_styles/img/cmdr-shane-610506-unsplash.jpg';
import mnemImg from '../../theme_styles/img/amador-loureiro-779-unsplash.jpg';
import privKeyImg from '../../theme_styles/img/jon-moore-399469-unsplash.jpg';
import saveImg from '../../theme_styles/img/icons/icon35.svg'
class MnemonicGenerator extends Component {
    state = {
        created: false,
        wallet: {},
        base64PubKey: '',
        base64PrivKey: ''
    }

    generateWallet = async () => {
        
        const entropyBits = 256;
        const mnem = bip39.entropyToMnemonic(crypto.randomBytes(entropyBits / 8).toString('hex'));
        const seed = bip39.mnemonicToSeed(mnem);
        const root = hdKey.fromMasterSeed(seed);

        const generatedWallet = root.derivePath("m/44'/60'/0'/0/0");
        const pubKey = generatedWallet.getWallet().getChecksumAddressString();
        const privKey = generatedWallet.getWallet().getPrivateKeyString();

        let base64PubKey = await QRCode.toDataURL(pubKey, { errorCorrectionLevel: 'H' });
        let base64PrivKey = await QRCode.toDataURL(privKey, { errorCorrectionLevel: 'H' });
        // await Promise.all([base64PubKey, base64PrivKey])

        // expires after 2 weeks
        // const expiry = new Date(Date.UTC())

        const expdays = 14;
        let d = new Date();
        d.setTime(d.getTime() + (expdays * 24 * 60 * 60 * 1000));

        document.cookie = `acct=${pubKey}; expires=${d.toUTCString()}; path=/`;
        document.cookie = `myKey=${privKey.slice(2)}; expires=${d.toUTCString()}; path=/`;

        this.setState({
            created: true,
            wallet: { mnem, pubKey, privKey },
            base64PubKey,
            base64PrivKey
        })

        Swal.fire(
            'Your new wallet was created!',
            'Go ahead an check out it\'s info',
            'success'
          )
    }

    render() {
        let walletInfo = null;
        if (this.state.created) {
            walletInfo = (
                <div>
                    <div className="container col-md-9 col-lg-8 mt-4">
                        <div className="text-center card d-flex justify-content-between col-md-auto">
                            <img src={saveImg} alt="Modular Structure" class="icon" />
                            <div>
                                <h5 className="mb-1 mt-2">Save your wallet details</h5>
                                <p>Save your Public Key, Mnemonic and Private Key to a text file that you can easily find.</p>
                                <p><strong>Normally you wouldn't store your private key in plain text file</strong>, but since this wallet holds no real world assets. It's okay for this exercise.</p>
                                
                            </div>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <a className="d-flex align-items-center flex-fill" href="#" data-toggle="collapse" data-target="#accordion-panel-1">
                                        <span className="col-4"><img src={pubKeyImg} alt="Public Key" className="rounded" /></span>
                                        <span className="mb-0 text-primary py-1 font-weight-bold">Your public key</span>
                                    </a>
                                    <i className="material-icons d-block text-dark">keyboard_arrow_right</i>
                                </div>
                                <small style={{ "fontSize": "8px" }}>Photo by CMDR Shane on Unsplash</small>
                                <div id="accordion-panel-1" className="collapse">
                                    <div className="py-1"><strong> This, you can share with the world.</strong> Whenever someone sends you funds, this is the data they need.</div>
                                    <div className="hex-container">{this.state.wallet.pubKey}</div>
                                    <QRContainer base64={this.state.base64PubKey} />
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <a className="d-flex align-items-center flex-fill" href="#" data-toggle="collapse" data-target="#accordion-panel-2">
                                        <span className="col-4"><img src={mnemImg} alt="Mnemonic" className="rounded" /></span>
                                        <span className="mb-0 text-primary py-1 font-weight-bold">Your mnemonic</span>
                                    </a>
                                    <i className="material-icons d-block text-dark">keyboard_arrow_right</i>
                                </div>
                                <small style={{ "fontSize": "8px" }}>Photo by Amador Loureiro on Unsplash</small>
                                <div id="accordion-panel-2" className="collapse">
                                    <div className="py-1"><strong> This, you don't want to share. Your account can be recreated using this 12 words.</strong></div>
                                    <div className="py-1">{this.state.wallet.mnem}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <a className="d-flex align-items-center flex-fill" href="#" data-toggle="collapse" data-target="#accordion-panel-3">
                                        <span className="col-4"><img src={privKeyImg} alt="Private Key" className="rounded" /></span>
                                        <span className="mb-0 text-primary py-1 font-weight-bold">Your private key</span>
                                    </a>
                                    <i className="material-icons d-block text-dark">keyboard_arrow_right</i>
                                </div>
                                <small style={{ "fontSize": "8px" }}>Photo by Jon Moore on Unsplash</small>
                                <div id="accordion-panel-3" className="collapse">
                                    <div className="py-1"><strong>This, you absolutely do not want to share with anyone!</strong> If someone gets a hold on this, they can still your funds.</div>
                                    <div className="hex-container">{this.state.wallet.privKey}</div>
                                    <QRContainer base64={this.state.base64PrivKey} />
                                </div>
                            </li>
                        </ul>

                        <div class="progress my-2">
                            <div class="progress-bar bg-primary" role="progressbar" style={{ "width": "25%" }} aria-valuenow="25" aria-valuemin="10" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="wallet-info-container">


                    </div>
                </div>
            );
        }
        return (
            <div className="wallet-generator-container">
                <div className="button-container text-center">
                    <div className="generate-button btn btn-light m-1" onClick={this.generateWallet}>Generate new Wallet</div>
                </div>
                {walletInfo}
                <div className="button-container text-center">
                    <div className="generate-button btn btn-light m-1" onClick={this.generateWallet}>Generate new Wallet</div>
                </div>
            </div>
        )
    }
}

export default MnemonicGenerator;
