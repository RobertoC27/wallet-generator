import React, { Component } from 'react';
import bip39 from 'bip39';
import hdKey from 'ethereumjs-wallet/hdkey';
import QRCode from 'qrcode';
import QRContainer from '../QRContainer/QrContainer';
import './MnemonicGenerator.css'
import crypto from 'crypto';

class MnemonicGenerator extends Component {
    state = {
        created: false,
        wallet: {},
        base64PubKey: '',
        base64PrivKey: ''
    }

    generateWallet = async () => {
        const entropyBits = 256;
        const mnem = bip39.entropyToMnemonic(crypto.randomBytes(entropyBits/8).toString('hex'));
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
        d.setTime(d.getTime() + (expdays*24*60*60*1000));

        document.cookie = `acct=${pubKey}; expires=${d.toUTCString()}; path=/`;
        document.cookie = `myKey=${privKey.slice(2)}; expires=${d.toUTCString()}; path=/`;
        
        this.setState({
            created: true,
            wallet: { mnem, pubKey, privKey },
            base64PubKey,
            base64PrivKey
        })

    }

    render() {
        let walletInfo = null;
        if (this.state.created) {
            walletInfo = (
                <div>
                    <div className="wallet-info-container">
                        <div className="info-container">
                            <h4>Wallet Address</h4>
                            <div className="hex-container">{this.state.wallet.pubKey}</div>
                            <QRContainer base64={this.state.base64PubKey} />
                        </div>
                        <div className="warning-container">
                            <div className="warning-info">Don't share your mnemonic or private key with anyone</div>
                        </div>
                        <div className="mnem-container">
                            <h4>12 word mnemonic seed</h4>
                            <div>{this.state.wallet.mnem}</div>
                        </div>
                        <div className="info-container">
                            <h4>Private Key</h4>
                            <div className="hex-container">{this.state.wallet.privKey}</div>
                            <QRContainer base64={this.state.base64PrivKey} />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="wallet-generator-container">
                <div className="button-container">
                    <div className="generate-button" onClick={this.generateWallet}>Generate new Wallet</div>
                </div>
                {walletInfo}
            </div>
        )
    }
}

export default MnemonicGenerator;