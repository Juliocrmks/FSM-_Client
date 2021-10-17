import React from 'react'
import ReactDOM from 'react-dom'
import {LikeButton, LIKE_POST_MUTATION} from '../components/LikeButton'
import {MockedProvider} from '@apollo/client/testing'
import { isTSAnyKeyword} from '@babel/types'
import TestRenderer from 'react-test-renderer'


const mocks = [{
    request:{
        query:LIKE_POST_MUTATION,
        variables:{
            postId:"123asd"
        },
    },
    result:{
        data:{
            likedPost:{
                id:"123asd",
                likes:{
                    id:"123asd",
                    username:"Julio"
                },
                likeCount:1
            }
        }
    }
}]
const user={
    username:"Julio"
}
const post = {
    id:"123asd",
    likes:{
        id:"123asd",
        username:"Julio"
    },
    likesCount:1
}


it("renders without error", ()=>{
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <LikeButton user={user} post={post}></LikeButton>
        </MockedProvider>
    )
    const tree = component.toJSON();
    console.log(tree);
})