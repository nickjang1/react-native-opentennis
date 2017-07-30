
'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-native';

export default class Page1 extends Component {
    render () {
        return (
            <View style={{flex:1, padding: 10}} >
                <Text>By downloading a free legal document available on this website, you accept and agree to our terms and conditions.{'\n'}

                        The main terms of the licence incorporated into the terms and conditions are as follows.{'\n'}

                        Unless you have paid for the right to use the relevant document without a credit and hyperlink, you must: (a) retain the credit in the free legal document; and (b) if you publish the document on a website, include a link to www.seqlegal.com from your website. {'\n'} 
                        The link can be pointed at any page on www.seqlegal.com.{'\n'}
                        Subject to this point, you may edit and amend the documents to render them suitable for your purposes.{'\n'}
                        You must not re-publish the free legal documents in unamended form. All footnotes and brackets should be removed from the documents before publication.{'\n'}
                        You must not sell or re-distribute the free legal documents or derivatives thereof.{'\n'}
                        We give no warranties or representations concerning the free legal documents, and accept no liability in relation to the use of the free legal documents.
                 </Text>
            </View>
        );
    }
}
