from uuid import uuid4

from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, LoginSerializer, RegisterSerializer
from django.core.mail import send_mail
from .models import Token
from django.contrib.auth.models import User

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ResetAPI(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print(request.data["email"])
        email = request.data["email"]
        token = str(uuid4())
        print(token)
        send_mail(
            'Betrede password recovery',
            'Here is your password recovery link: https://betrede.com/recovery/{0}'.format(str(token)),
            'admin@betrede.com',
            [email],
            fail_silently=False,
        )

        newToken = Token(email=email, token=token)
        newToken.save()
        
        
        return Response({
            "status": request.data["email"]
        })


class UpdateAPI(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        token = request.data["token"]
        password = request.data["password"]
        print('sup')
        dbToken = Token.objects.get(token=token)
        if dbToken:
            print(dbToken.email)
            print(password)
            user = User.objects.get(email=dbToken.email)
            user.set_password(password)
            user.save()
            print(user)

            return Response({
                "status": 'ok'
            })
        
        return Response(status=status.HTTP_204_NO_CONTENT)

       
